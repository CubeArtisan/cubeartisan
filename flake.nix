{
  description = "CubeArtisan";
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
    let
      buildNodeJs = "${nixpkgs}/pkgs/development/web/nodejs/nodejs.nix";
      pkgs = import nixpkgs {
        inherit system;
      };
      drv = pkgs.mkShell {
        name = "cubeartisan";
        buildInputs = [
          pkgs.cairo
          pkgs.crc32c
          pkgs.docker-compose
          pkgs.gcc
          pkgs.giflib
          pkgs.libjpeg
          pkgs.libpng
          pkgs.libuuid.out
          pkgs.nodejs
          pkgs.pango
          pkgs.pkg-config
          pkgs.yarn
        ];
        shellHook = ''
          export LD_LIBRARY_PATH=${pkgs.libuuid.out}/lib:$LD_LIBRARY_PATH
        '';
      };
      image-drv = pkgs.mkShell {
        name = "cubeartisan";
        buildInputs = [
          pkgs.nodejs-18_x
          pkgs.pkg-config
          pkgs.cairo
          pkgs.pango
          pkgs.libpng
          pkgs.libjpeg
          pkgs.giflib
          pkgs.gcc
          pkgs.libuuid.out
          pkgs.yarn
        ];
        shellHook = ''
          export LD_LIBRARY_PATH=${pkgs.libuuid.out}/lib:$LD_LIBRARY_PATH
          yarn install
          yarn build
        '';
      };
    in
    {
      devShell = drv;
      defaultPackage = drv;
      packages = {
        cubeartisanServerImage = pkgs.dockerTools.buildLayeredImage {
          name = "cubeartisan";
          contents = [image-drv];
          config = {
            Cmd = [
              "yarn server"
            ];
            ExposedPorts = {
              "5000/tcp" = { };
            };
          };
        };
      };
    }
  );
}
