import Text "mo:base/Text";
import Option "mo:base/Option";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Blob "mo:base/Blob";
import Error "mo:base/Error";
import Bool "mo:base/Bool";

import Debug "mo:base/Debug";

import Types "types";

actor {

    // 4 GB / 8 KB per note key (same size as note) ~~ 500 000 notes 
    private let MAX_KEY_CHARS = 2000;
    private let genericErrorMessage: Text = "Couldn't save note. Try again.";

    type SaveKeyResponse = {
        status_code: Nat16;
        error_message: Text;
        id: Types.KeyId;
    };

    type ReadKeyResponse = {
        status_code: Nat16;
        error_message: Text;
        key: Types.KeyBody;
    };

    private var keys = HashMap.HashMap<Types.KeyId, Types.KeyBody>(0, Text.equal, Text.hash);
    private stable var stable_keys: [(Types.KeyId, Types.KeyBody)] = [];

    public shared func saveKey(id: Text, key: Text): async SaveKeyResponse {
        assert (key.size() <= MAX_KEY_CHARS);

        if (idExists(id)) {
            Debug.print(genericErrorMessage);
            return {
                status_code = 500;
                error_message = genericErrorMessage;
                id = "";
            };
        } else {
            keys.put(id, key);
            Debug.print(debug_show(id));
            return {
                status_code = 200;
                error_message = "";
                id = id;
            };
        }
    };

    public shared func readKey(id: Types.KeyId): async ReadKeyResponse {
        switch (keys.get(id)) {
            case (null) {
                Debug.print("No such key. Couldn't retrieve note.");
                return {
                    status_code = 500;
                    error_message = "No such key. Couldn't retrieve note.";
                    key = "";
                };
            };
            case (?keyVal) {
                Debug.print(debug_show(keyVal));
                // deleteKey(id);
                return {
                    status_code = 200;
                    error_message = "";
                    key = keyVal;
                };
            };
        };
    };

    private func idExists(id: Types.KeyId): Bool {
        return keys.get(id) != null;
    };

    private func deleteKey(id: Types.KeyId): () {
        keys.delete(id);
    };

    system func preupgrade() {
        stable_keys := Iter.toArray(keys.entries());
    };

    system func postupgrade() {
      keys := HashMap.fromIter<Types.KeyId, Types.KeyBody>(stable_keys.vals(), stable_keys.size(), Text.equal, Text.hash);
      stable_keys := [];
    };

};
