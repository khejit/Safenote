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
      , { dependencies = [ "base" ]
        , name = "mrr"
        , repo = "https://github.com/research-ag/motoko-lib"
        , version = "main"
      }
      , { dependencies = [] : List Text
        , name = "base-0.7.3"
        , repo = "https://github.com/research-ag/motoko-lib"
        , version = "moc-0.7.3"
      }
      , { name = "array"
        , version = "v0.2.1"
        , repo = "https://github.com/aviate-labs/array.mo"
        , dependencies = [ "base-0.7.3" ] : List Text
      }
      , { dependencies = [ "base-0.7.3", "array" ]
        , name = "encoding"
        , repo = "https://github.com/aviate-labs/encoding.mo"
        , version = "main"
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
