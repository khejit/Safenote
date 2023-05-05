let upstream = https://github.com/dfinity/vessel-package-set/releases/download/mo-0.8.4-20230311/package-set.dhall sha256:bf5cec8ba99cfa6abcdb793a4aeaea9f4c913a4bd97af0a556bd6e81aaf75cd4
let Package =
    { name : Text, version : Text, repo : Text, dependencies : List Text }

let
  -- This is where you can add your own packages to the package-set
  additions =
    [
      { dependencies = [] : List Text
        , name = "base"
        , repo = "https://github.com/dfinity/motoko-base.git"
        , version = "moc-0.8.4"
        }
    ] : List Package

let
  {- This is where you can override existing packages in the package-set

     For example, if you wanted to use version `v2.0.0` of the foo library:
     let overrides = [
         { name = "foo"
         , version = "v2.0.0"
         , repo = "https://github.com/bar/foo"
         , dependencies = [] : List Text
         }
     ]
  -}
  overrides =
    [] : List Package

in  upstream # additions # overrides
