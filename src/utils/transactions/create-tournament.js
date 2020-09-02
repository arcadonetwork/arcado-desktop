import { BaseTransaction, TransactionError, utils } from '@liskhq/lisk-transactions';

/**
 * Create new tournament with details
 */
export class CreateTournamentTransaction extends BaseTransaction {

    static get TYPE () {
        return 30;
    }

    static get FEE () {
        return '0';
    };

    async prepare(store) {
        await store.account.cache([
            {
                address: "11237980039345381032L", // genesis
            },
            {
                address: this.asset.address,
            }
        ]);
    }

    validateAsset() {
        const errors = [];
        const distributionSum = (this.asset.distribution.first + this.asset.distribution.second + this.asset.distribution.third)
        if (distributionSum !== 100) {
            errors.push(
                new TransactionError(
                    'Invalid "asset.distribution" defined on transaction -> not equal to 100',
                    this.id,
                    '.asset.distribution',
                    this.asset.distribution
                )
            );
        }

        return errors;
    }

    applyAsset(store) {
        const errors = [];
        const genesis = store.account.get("11237980039345381032L");
        let asset = {
            tournaments: [],
            ...genesis.asset
        }

        asset.tournaments.push({
            createdBy: this.asset.address,
            name: this.asset.name,
            tournamentId: this.asset.tournamentId,
            gameId: this.asset.gameId,
            entryFee: this.asset.entryFee, // string
            participants: [],
            distribution: this.asset.distribution,
            maxPlayers: this.asset.maxPlayers,
            status: 0 // 0 open to join, 1 started, 2 ended
        })

        const updatedGenesis = {
            ...genesis,
            asset
        };
        store.account.set(genesis.address, updatedGenesis);

        // No need for balance property in game object
        // Don't need this property as we can calculate the players * entryFee and use the distribution to pay out
        const player = store.account.get(this.asset.address);
        const playerBalance = new utils.BigNum(player.balance);
        const entryFeeBalance = new utils.BigNum(this.asset.entryFee)
        const updatedPlayerBalance = playerBalance.sub(entryFeeBalance);
        const updatedPlayer = {
            ...player,
            balance: updatedPlayerBalance.toString()
        }

        store.account.set(player.address, updatedPlayer);

        return errors;
    }

    undoAsset(store) {
        // Add entryfee back to user balance
        const errors = [];
        const genesis = store.account.get("11237980039345381032L");

        const gameIndex = genesis.asset.tournaments.findIndex(game => game.tournamentId === this.asset.tournamentId)

        let asset = {
            ...genesis.asset
        }
        asset.tournaments.splice(gameIndex, 1)
        const updatedGenesis = {
            ...genesis,
            asset
        };
        store.account.set(genesis.address, updatedGenesis);

        return errors;
    }

}
