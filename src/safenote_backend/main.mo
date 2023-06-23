import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Error "mo:base/Error";
import Bool "mo:base/Bool";

import Debug "mo:base/Debug";

import Types "types";

actor {

    // 4 GB / 8 KB per note key (same size as note) ~~ 500 000 notes 
    private let MAX_KEY_CHARS = 2000;

    private var keys = HashMap.HashMap<Types.KeyId, Types.KeyBody>(0, Text.equal, Text.hash);
    private stable var stable_keys: [(Types.KeyId, Types.KeyBody)] = [];

    public shared func saveKey(id: Text, key: Text): async Types.KeyId {

        let genericErrorMessage: Text = "Couldn't save note. Try again.";

        assert (key.size() <= MAX_KEY_CHARS);
        assert (id != "") and (key != "");

        if (idExists(id)) {
            Debug.print(genericErrorMessage);
            throw Error.reject(genericErrorMessage);
        } else {
            keys.put(id, key);
            Debug.print(debug_show(id));
            return id;
        }
    };

    public shared func readKey(id: Types.KeyId): async Types.KeyBody {

        let noKeyErrorMessage = "No such key. Couldn't retrieve note.";

        switch (keys.get(id)) {
            case (null) {
                Debug.print(noKeyErrorMessage);
                throw Error.reject(noKeyErrorMessage);
            };
            case (?keyVal) {
                Debug.print(debug_show(keyVal));
                deleteKey(id);
                return keyVal;
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
