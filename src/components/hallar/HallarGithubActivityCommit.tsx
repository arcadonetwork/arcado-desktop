import React from 'react';
import { GithubCommit } from '../../utils/hallar';

const MESSAGE_LIMIT = 50;

interface Props {
  commit: GithubCommit
}

export const HallarGithubActivityCommit: React.FC<Props> = ({ commit }) => {
  const substring = `${commit.message.substring(0, MESSAGE_LIMIT)}..`
  return (
    <div className="flex-c fs-s">
      <span className="img--5 circle mr5 bgc-black" />
      <span className="ffm-bold mr5">{commit.sha.substr(commit.sha.length - 7)}</span>
      <span>{substring}</span>
    </div>
  )
}
