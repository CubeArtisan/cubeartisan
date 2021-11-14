# Introduction

### What is CubeArtisan?

The main goal with CubeArtisan is to create a cube management site that provides the most powerful
tools available to our users with the best UX we can design.

### Why contribute?

Maybe there is some bug that bothers you or some feature you wish was on the site. You can just build
that and it'll almost definitely get merged in and deployed with the next release. You may also just
want to contribute to give back to the community or solve interesting problems. We welcome all kinds
of developers and other interested contributors. We'd love to have some people experienced with UX to
help improve the site so whatever your skill set please reach out on (Discord)[https://discord.gg/qWPjyACs32]

Don't feel nervous about making your first contribution, we accept developers with all levels of
knowledge and will happily work with and help with whatever you need to make your first contribution.
We are not code snobs, so don't be afraid to reach out with questions of any kind. Your feedback will
help improve the onboarding process for those developers that come after you.

### What kind of contributions do we need?

The issues tab in github is kept up to date and tagged, but any contribution is appriciated from
code comments to experimental features. Also see the #proposals channel in Discord.

# Ground Rules
### Code of conduct.

Be a decent person. Copy pasted from the linux code of conduct: In the interest of fostering an
open and welcoming environment, we as contributors and maintainers pledge to making participation in
our project and our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, sex characteristics, gender identity and expression, level of
experience, education, socio-economic status, nationality, personal appearance, race, religion, or
sexual identity and orientation.

> Characteristics of an ideal contributor
> * Creates issues for changes and enhancements they wish to make.
> * Discusses proposed changes transparently and listens to community feedback.
> * Keeps pull requests small.
> * Is welcoming to newcomers and encourages diverse new contributors from all backgrounds. See the [Python Community Code of Conduct](https://www.python.org/psf/codeofconduct/).

Contributing to CubeArtisan does not entitle any contributor to compensation of any kind.
Contributions are made at will, with the goal of improving the tool for the entire community.
CubeArtisan's hosting costs are paid through donations and affiliate links with the rest coming from
ruler501. These funds are managed solely by ruler501 (Devon Richards), who is solely in charge of
hosting and managing the live site, though is always open to additional help. You can see the
CubeArtisan/cubeartisan-infrastructure project to see how our infrastructure is deployed.

# Your First Contribution

Issues are tagged with 'good first issue' if we think it's a good beginner task to tackle. Completing
a few small changes to become familar with the codebase before diving into a huge feature is usually
a good idea, but we'll help you if you want to start with something larger.

# How we collaborate - asynchronous communication

Our community of contributors is large, and growing fast. We don't have regularly
scheduled working hours dedicated to CubeArtisan. Thus, we can't simply message each
other on Discord to understand the current state of the project. Discord is
a great tool for synchronous communication, but it falls short at allowing
community members to discover conversations they didn't participate in. Our project
also requires a focus on asynchronous methods of communication. The goal is for
the current state of the project, including features being worked on, issues not
yet resolved, and near-term roadmap plans, to be fully discoverable by a passerby
without needing to chat in realtime with anyone else.

GitHub projects, issues, and pull requests serve this purpose beautifully. We
treat the dekkerglen/CubeCobra repository as the source of truth about what
work is complete, in progress, and not yet started. If you want to know
whether someone is working on a feature, for example, or if anyone else has
noticed the issue you're seeing, GitHub pull requests and issues are the first
place you should look. We use GitHub this way because it has great support for
discovering long-lived tickets even years after the fact. Put simply, it is
a system of record. This practice, when adhered to vigilantly, leads to
increased collective productivity and deacreased blocking between community
members and development efforts.

## How we use GitHub issues

GitHub issues are the source of truth about known issues and planned features.
If a planned feature doesn't have an open issue, it's not a planned feature.
If a bug doesn't have an open issue, it's unknown and should have one.

When we file issues, we include links to related issues and pull requests in
the issue description. GitHub makes linking to related issues and pull
requests easy by automatically expanding the text #1234 into a link to issue 1234.
These links provide a trail of breadcrumbs for community members to follow
when learning about the group's thoughts on a given bug or feature request.

When we notice a bug, we first look for an existing open issue that references the
bug. If we find one, we comment on the issue or use a GitHub reaction emoji to
indicate that we have also noticed the bug. If we don't find one, we open a new
issue about the bug. When we notice a change in a bug's behavior, or a new case in
which the bug can be replicated, we leave comments to that effect on the issue.

When we begin actively working on a feature, we comment to that effect on the
corresponding issue. This comment of "I'm working on this" indicates to other
community members that this feature is covered, and to find something else to
work on. Since GitHub does not allow community members to assign themselves to
issues, we comment in this manner to make it clear to the community what work
is currently in progress, and who owns that work.

## How we use GitHub pull requests

Pull requests are the primary way that we share our work, both finished and in
progress, with each other. When we open pull requests, we're communicating to
the community that we are actively working on code changes, and we have some
code to show for it. Though pull requests are not the source of truth about
bug/feature ownership (issues get that title), they are a very useful tool for
keeping community members abreast of one's progress without sending an @-everyone
message in Discord.

When we're working on pull requests over the course of multiple days,
sometimes we open `[WIP]` (work in progress) pull requests. We clearly
indicate that these are WIP in the description to avoid premature code reviews
from the community. When we do this, we're communicating that we'd like others
to be aware of the details of our progress without requesting a detailed code
review just yet. The easiest way to do this is to mark the PR as a Draft PR in
the GitHub UI.

When we feel that a feature we're working on is far enough along for feedback, we open pull
requests. If it isn't ready for deployment mark it as a Draft. These pull requests have titles that
describe what was changed and why. Some of this will likely overflow into the description and that's
okay. The goal of these descriptions is to aid in the code review process, making it easier for a
contributor with no prior knowledge of the pull request to perform a review. We also comment on our
own pull requests asking for code review, sometimes even tagging specific individuals from whom we'd
like a review.

Our pull requests have automated checks run against them, including code style
linting and unit tests. When we request reviews on pull requests, we ensure
that these checks are passing beforehand. When we add new functionality in a
pull request, we also add new tests exercising that functionality in the same
pull request. When we fix a bug in a pull request, we also add a unit test or
adjust an existing one in the same pull request to prove that the bug has been
fixed. When possible please add Unit Tests to new code, but they are not strictly required.
We'd love help filling out the unit testing framework if someone is interested.

When we notice open pull requests  we review each other's code. The primary goal of code reviews is
to help ensure that the code does not have any potential issues or unintended interactions. We also
check that the code fully satisfies the related feature request or fixes the related bug. Secondary
goals are to cleanup code and make it easy for new contributors to understand conforms to best
practices for code efficiency and style.

We review each other's code using the GitHub "review" workflow, especially its
line-commenting feature. We leave comments on specific lines that we notice
problems with. We also make liberal use of links - to lines of code, other
issues and pull requests, or external documentation - to strengthen the points
we bring up in our code reviews. We do this also to leave a trail of
breadcrumbs explaining our thought process for future readers of the code review,
including our future selves.

When a pull request is closed or merged, there are sometimes threads left
hanging that require more work to be done. When this happens, we open issues
tracking that remaining work.

## How we use git branches

The `dev` branch is the branch which is currently deployed to staging (or in the process of deploying).
CI must always pass on `dev`. `prod` is the branch that should always represent the version currently on
production. There is a slight subtlety here in that it's actually the latest tag of the form `vX.Y.Z`
that is deployed. If that doesn't match the current commit on `prod` please let us know since that
means something got done incorrectly.

For contributing you first, ask to be assigned to an issue, and create a fork of the repository on
GitHub. When you are finished with the feature, create a pull request back into the `dev` branch or for
urgent fixes for production into `prod`. An admin will review your code and merge when all issues are
resolved. Expect some comments and feedback, a second or third set of eyes usually finds small things
we miss.

## How we use Discord

Our community collaborates in an asynchronous manner because it minimizes
blocking and conflicts between various threads of work. We manage our known
bugs, feature requests, and work in progress using GitHub's asychronous tools.
Even so, there are some times when it's useful to have access to synchronous
communication with other community members.

Our community's most important use for Discord is interaction with
non-technical users of CubeArtisan. Discord is a great way to get to know the
needs and wants of the user base, and can inform plans for features and
bugfixes. It also has the #proposals polls for new features.

Another good use of Discord for contributors is staying abreast of the current
state of the production server. Though this is usually best handled by requesting someone with prod
access to give you access to the GCP dashboards monitoring production/staging. If there are new bugs
being reported frequently that require rapid response, a Discord "war room" can be the best
way to handle these reports.

Our community does not treat Discord as a system of record. Though it's not
private, we assume that everything we type on Discord will either be read
within a few minutes or not at all. Thus, when we have anything to say that we
think someone might care about later than a few minutes from now, we put it in
a GitHub issue, comment, or pull request.

### Code Style

CubeArtisan currently uses 4 languages: Javascript (specifically React flavored JSX with ES2020
support), Jade/PUG (as little as possible), and CSS. Before creating your pull request, you can fix
any style errors by running `yarn lint:fix` from the project root.


### Staging Deployment

The current staging deployment can be accessed at: http://staging.cubeartisan.net/
This deployment runs the latest commits from the `dev` branch. The staging deployment is a great way to
test new features in an environment nearly identical to the prod deployment. Please report any bugs
you see on the development server as an issue. The development server database is not wiped
periodically, but it is subject to instability, so don't use it as a reliable way to store any data.
It shares almost no services with Production so it is pretty safe to try more experimental changes
on.

# Release Schedule

Releases are created roughly once a month on a Saturday morning (this is usual but it can vary).
There is a feature freeze 3 days before the release where no feature pull requests will be approved,
only bugfixes. This will be announced in Discord. This is to reduce the change of regressions on the
live server.

# How to report a bug

If you find a security vulnerability, do NOT open an issue. Send a private message to
ruler501#5217 or another site manager on Discord instead. You can also email admin@cubeartisan.new.
Bugs not related to security should be reported through GitHub issues if possible.


# How to suggest a feature or enhancement

## Join the discord disscussion.

https://discord.gg/qWPjyACs32

# Community

We have a somewhat active Discord and would love for you to join the discussion. 
