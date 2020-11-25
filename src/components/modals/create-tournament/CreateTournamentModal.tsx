import React, { useState } from 'react';
import { GameModel } from '../../../typings/game.model';
import Modal from 'antd/es/modal';
import { message } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { useForm } from 'react-hook-form';
import { createTournament } from '../../../shared/api/tournaments';
import { Dispatch, iRootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toRawLsk } from '../../../utils/currency-converters';
import { TournamentModel } from '../../../typings/tournament.model';
import { generateUUID } from '../../../utils/uuid';
import { CreateTournamentModalTxConfirmation } from './CreateTournamentModalTxConfirmation';
import { CreateTournamentModalForm } from './CreateTournamentModalForm';
import { TRANSACTION_TYPES } from '@arcado/arcado-transactions/dist-node/utils';
import { isArrayWithElements } from '../../../utils/type-checking';

type DistributionData = {
  first: number;
  second: number;
  third: number;
}

type TournamentData = {
  id: string;
  name: string;
  maxPlayers: number;
  entryFee?: number;
  distribution: DistributionData
}

interface ContainerProps extends RouteComponentProps {
  game: GameModel,
  isCreatingTournament: boolean
}

const GameDetailsPageHeaderCreateTournamentComponent: React.FC<ContainerProps> = ({ game, isCreatingTournament }) => {
  const {
    register,
    handleSubmit,
    errors
  } = useForm<TournamentData>()
  const [distributionError, setDistributionError] = useState<string>(undefined);

  const dispatch = useDispatch<Dispatch>();
  const account = useSelector((state: iRootState) => state.account.account);
  const actionBroadcast = useSelector((state: iRootState) => state.network.actionBroadcast);

  if (!isCreatingTournament) {
    return <></>;
  }

  async function createOnClick (tournamentData: TournamentData) {
    let { first, second, third } = tournamentData.distribution;
    [first, second, third] = [first, second, third].map(Number);
    if ((first + second + third) !== 100) {
      setDistributionError('Prize Distribution is not equal to 100')
      return;
    } else {
      setDistributionError(undefined)
    }
    try {
      const id = generateUUID();
      tournamentData.entryFee = toRawLsk(tournamentData.entryFee);
      const body: TournamentModel = {
        ...tournamentData,
        gameId: game.id,
        id
      };

      await createTournament(game.id, body, account.passphrase);
      dispatch.network.setActionBroadcast(TRANSACTION_TYPES.TOURNAMENTS)
    } catch (e) {
      if (isArrayWithElements(e.errors)) {
        e.errors.map((item: any) => message.error(item.message))
      }
      dispatch.network.setActionBroadcast(undefined);
      dispatch.tournaments.setIsCreatingTournament(false);
    }
  }

  let Component;

  if (actionBroadcast) {
    Component = (
      <CreateTournamentModalTxConfirmation />
    )
  } else {
    Component = (
      <CreateTournamentModalForm
        register={register}
        errors={errors}
        distributionError={distributionError}
      />
    )
  }

  let optionalModalProps: any = {
    onCancel : () => dispatch.tournaments.setIsCreatingTournament(false)
  }

  if (actionBroadcast) {
    optionalModalProps.footer = null;
    optionalModalProps.onCancel = () => ''
  }

  return (
    <Modal
      visible={isCreatingTournament}
      title={`${game.name} - Create tournament`}
      onOk={handleSubmit(createOnClick)}
      closable={false}
      okButtonProps={{ disabled: !!actionBroadcast }}
      okText="Create"
      {...optionalModalProps}
    >
      {Component}
    </Modal>
  )
}

export const CreateTournamentModal = withRouter(GameDetailsPageHeaderCreateTournamentComponent);
