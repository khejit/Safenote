# Safenote
A tool for secure notes exchanging. Built for Internet Computer.

## Running the project locally

Make sure you have [Internet Computer SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/) installed.
If you want to test the project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, the application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

Additionally, if you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

## Deploying
Safenote is already hosted on Internet Computer under https://safenote.store/ domain. You can deploy your own instance. Below is a quick guide how to do it.

We assume you already have Internet Computer identity and ledger associated with it has some icp.

1. You can check identity principal with:

```bash
dfx identity get-principal
```

2. Note principal text and use it in the next command to create empty canister:

```bash
dfx ledger create-canister --network ic your-principal-text
```

The result should contain canister id.

3. Go to https://dashboard.internetcomputer.org/canister/id/, where *id* is replaced with your canister id. On Internet Computer dashboard you can check subnet in which your canister landed.

4. Repeat the steps 2-3 for another 2 new canisters. After each new canister mind the subnet id - if it's the same as any previous subnet id, bad luck! You have to create new canister and forget about the canister which landed in the same subnet. Gather 3 canisters each in different subnet.

5. Deploy your wallets.

```bash
dfx identity deploy-wallet --network ic canister-id
```

Do this 3 times substituting *canister-id* with one of your 3 subnet-unique canisters.

At this point you have 3 wallet canisters, which can be used to deploy Safenote backend canisters. Any canister deployed lands in the same subnet as the wallet canister used during deploy. Frontend canister can be in the same subnet as one of backend canisters, but if you want you can create separate wallet for frontend with steps 2 and 5.

6. Top up your wallets with some cycles.

7. Set wallet for the next canister which will be deployed:

```bash
dfx identity set-wallet wallet-id
```
Change *wallet-id* to one of wallets deployed in step 5.

8. Deploy canister:

```bash
dfx deploy --network ic safenote_backend_1
```

9. Do steps 7-8 for **safenote_backend_2** and **safenote_backend_3**.

10. Do the same for **safenote_frontend** canister. You can choose any wallet you like in step 7 for frontend canister. Just bear in mind that if you assign the same wallet for frontend and one of the backend canisters, it will consume more cycles than other wallets.
