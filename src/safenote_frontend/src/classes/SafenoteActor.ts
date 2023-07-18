import { Actor, HttpAgent } from "@dfinity/agent";

// Re-exports candid interface
export { idlFactory as idlFactory1 } from "@/../../declarations/safenote_backend_1/safenote_backend_1.did.js";
export { idlFactory as idlFactory2 } from "@/../../declarations/safenote_backend_2/safenote_backend_2.did.js";
export { idlFactory as idlFactory3 } from "@/../../declarations/safenote_backend_3/safenote_backend_3.did.js";

// CANISTER_ID is replaced by webpack based on node environment
export const canisterId1 = process.env.SAFENOTE_BACKEND_1_CANISTER_ID;
export const canisterId2 = process.env.SAFENOTE_BACKEND_2_CANISTER_ID;
export const canisterId3 = process.env.SAFENOTE_BACKEND_3_CANISTER_ID;

export default class SafenoteActor {

    constructor(canisterId, options = {}) {
        this.agent = options.agent || new HttpAgent({ ...options.agentOptions });
        this.canisterId = canisterId;
        this.options = options;

        if (this.options.agent && this.options.agentOptions) {
            console.warn(
                "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
            );
        }

        // Fetch root key for certificate validation during development
        if (process.env.DFX_NETWORK !== "ic") {
            this.agent.fetchRootKey().catch((err) => {
                console.warn(
                    "Unable to fetch root key. Check to ensure that your local replica is running"
                );
                console.error(err);
            });
        }
    }

    create(idlFactory) {
        // Creates an actor with using the candid interface and the HttpAgent
        return Actor.createActor(idlFactory, {
            agent: this.agent,
            canisterId: this.canisterId,
            ...this.options.actorOptions,
        });
    }
};
