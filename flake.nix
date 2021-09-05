{
  description = "CubeArtisan";
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
        drv = with pkgs; pkgs.mkShell {
          name = "shell";
          buildInputs = [nodejs-16_x pkg-config cairo pango libpng libjpeg giflib gcc libuuid.out yarn];
          shellHook = ''
            export LD_LIBRARY_PATH=${libuuid.out}/lib:$LD_LIBRARY_PATH
          '';
        };
      in
      {
        devShell = drv;
        defaultPackage = drv;
      }
    );
}
