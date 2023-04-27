import Text "mo:base/Text";
import Int "mo:base/Int";
import Nat8 "mo:base/Nat8";
import Blob "mo:base/Blob";
import Time "mo:base/Time";
import Sha256 "mo:mrr/Sha256";
import Hex "mo:encoding/Hex";

import Debug "mo:base/Debug";

import Types "../types";

module {

    public class EncryptionEngine () {

        var counter: Nat = 0;

        public func generateId(noteKey: Text, salt: Text): Types.Result<Types.KeyId, Text> {            
            // id = sha224(noteKey + salt + time() + counter)
            
            let nowInMiliseconds = Time.now() / 1_000_000;
            counter += 1;
            let string = noteKey # salt # Int.toText(nowInMiliseconds) # Int.toText(counter);

            let id = Hex.encode(Blob.toArray(Sha256.fromBlob(#sha224, Text.encodeUtf8(string))));

            switch id {
                case "" #err("Couldn't generate id.");
                case (idVal) #ok(idVal);
            };
        };

    }

}