import React, { useState } from 'react';
import { Button } from 'antd';
import Checkbox from 'antd/es/checkbox';
import { AccountModel } from '../../models/account.model';
import { CustomIcon } from '../../components/custom-icon/CustomIcon';

interface ContainerProps {
  confirmAccount(): void,
  selectedAccount: AccountModel
}

export const InitialiseAccountVerification: React.FC<ContainerProps> = ({ confirmAccount, selectedAccount }) => {

  const [hasSavedPassphrase, setHasSavedPassphrase] = useState<boolean>(false);

  return (
    <div className="w40 m-auto flex-c flex-column mt75">

      <div className="w100 mb25 br-b pb25 flex-fs flex-jc-c flex-column">
        <h1 className="fs-xl ffm-bold p0 m0 mb5">Almost There!</h1>
        <h2 className="fs-n fc-grey p0 m0">It is of the utmost importance that you read following paragraph.</h2>
      </div>

      <div className="flex-fs flex-column w100">
        <div className="flex-c mb5 fc-red ffm-bold">
          <div className="mr10">
            <CustomIcon type="warning" />
          </div>
          <span>WARNING!</span>
        </div>
        <p className="">The <span className="ffm-bold fc-black">Passphrase</span> given at the bottom is the only possible way to access your account. <span className="ffm-bold fc-black">You are the only one who can access the account.</span> Nobody will ever be able to retrieve credentials if you would loose the set given credentials.</p>
      </div>

      <div className="w100 mt15">
        <div className="fs-m fc-black ffm-bold">Passphrase</div>
        <div className="fc-grey mb15">Write down these 12 words and store them in a safe place.</div>
        <div className="w100 grid-col6 p15-25 br br-c-primary">
          {selectedAccount.passphrase.split(" ").map((item, idx) => (
            <div className="flex-c w100">
              <div className="mr5 fc-lgrey noselect">{idx + 1}.</div>
              <div className="fs-m fc-black">{item}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w100 mt15 flex-c flex-jc-fe" >
        <Button className="" disabled>
          Copy passphrase
        </Button>
        <Button className="ml15" disabled>
          Download JSON
        </Button>
      </div>

      <div className="w100 mb25 mt50 pt25 br-t">
        <Checkbox value={hasSavedPassphrase} onChange={() => setHasSavedPassphrase(!hasSavedPassphrase)}>My passphrase is secure</Checkbox>
      </div>
      <Button
        disabled={!hasSavedPassphrase}
        onClick={() => confirmAccount()}
        className="w100 h45--fixed"
        type="primary">
        Enter the Arcado ecosystem
      </Button>
    </div>
  )
}
