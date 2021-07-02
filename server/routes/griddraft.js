router.get('/:id', async (req, res) => {
  try {
    const draft = await GridDraft.findById(req.params.id).lean();
    if (!draft) {
      req.flash('danger', 'Draft not found');
      return res.redirect('/404');
    }

    const cube = await Cube.findOne(buildIdQuery(draft.cube)).lean();

    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }

    const user = await User.findById(cube.owner);
    if (!user) {
      req.flash('danger', 'Owner not found');
      return res.redirect('/404');
    }

    let eloOverrideDict = {};
    if (cube.useCubeElo) {
      const analytic = await CubeAnalytic.findOne({ cube: cube._id });
      eloOverrideDict = fromEntries(analytic.cards.map((c) => [c.cardName, c.elo]));
    }

    // insert card details everywhere that needs them
    for (const card of draft.cards) {
      card.details = carddb.cardFromId(card.cardID);
      if (eloOverrideDict[card.details.name_lower]) {
        card.details.elo = eloOverrideDict[card.details.name_lower];
      }
    }

    return render(
      req,
      res,
      'GridDraftPage',
      {
        cube,
        initialDraft: draft,
      },
      {
        title: `${abbreviate(cube.name)} - Grift Draft`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} Grid Draft: ${cube.name}`,
          miscutil.getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}/cube/griddraft/${req.params.id}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
});

router.post('/:id', async (req, res) => {
  await GridDraft.updateOne(
    {
      _id: req.body._id,
    },
    req.body,
  );

  return res.status(200).send({
    success: 'true',
  });
});
