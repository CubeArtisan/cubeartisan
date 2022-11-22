{
  description = "CubeArtisan";
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs {
        inherit system;
        };
      nodejs = pkgs.stdenv.mkDerivation {
        name = "corepack-shims";
        buildInputs = [ pkgs.nodejs-18_x ];
        phases = [ "installPhase" ];
        installPhase = ''
          mkdir -p $out/bin
          corepack enable --install-directory=$out/bin
        '';
      };
      drv = pkgs.mkShell {
        name = "cubeartisan";
        buildInputs = [
          pkgs.docker-compose
          pkgs.crc32c
          nodejs
          pkgs.nodejs-18_x
          pkgs.google-cloud-sdk
        ];
      };
      image-drv = pkgs.mkShell {
        name = "cubeartisan";
        buildInputs = [
          pkgs.crc32c
          nodejs
          pkgs.google-cloud-sdk
        ];
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
              "pnpm start"
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
