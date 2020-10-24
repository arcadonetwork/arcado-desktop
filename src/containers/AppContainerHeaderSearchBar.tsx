import React, { ChangeEvent, useRef, useState } from 'react';
import { Dropdown } from 'antd/lib/index'
import { RouteComponentProps, withRouter } from 'react-router';
import Menu from 'antd/es/menu'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import { AppContainerHeaderSearchBarItem } from './AppContainerHeaderSearchBarItem'

import { getGames } from '../shared/api/games';
import { GameModel } from '../models/game.model';
import _ from 'lodash'
import { isArrayWithElements } from '../utils/type-checking';


interface ContainerProps extends RouteComponentProps {
}

const SearchBar: React.FC<ContainerProps> = ({ history }) => {

  const delayedQuery = useRef(_.debounce(q => searchQuery(q), 750)).current
  const [query, setQuery] = useState<string>();
  const [search_loading, setSearchLoading] = useState<boolean>();
  const [result, setResult] = useState<GameModel[]>([]);

  function onBlur () {
    setResult([])
  }

  function navigate (uri: string) {
    history.push(uri);
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    delayedQuery(event.target.value)
  }

  async function searchQuery(value: string) {
    if (value.length <= 1) return;
    setResult([]);
    setSearchLoading(true);
    let result: GameModel[] = [];
    try {
      const response = await getGames({ contains: value, limit: 3, asset: "name" })
      result = response.data.map(item => item.asset);
    } catch (error) {

    }
    setResult(result);
    setSearchLoading(false);
  }

  return (
    <Dropdown
      visible={isArrayWithElements(result)}
      overlay={
        <Menu className="bg--dd-menu p5">
          {result.map((item: any, idx: number) => (
            <Menu.Item
              key={idx}
              className="search--menu-item br5 w100 fc-lb click hover color-lb flex-c flex-jc-c">
              <AppContainerHeaderSearchBarItem
                item={item}
                navigate={navigate}
              />
            </Menu.Item>
          ))}
        </Menu>
      }>
      <div className="menu--search bgc-white br20 bgc-xl-grey flex-c flex-jc-c w350--fixed color-lb ml25 pl25">
        <div className="mr15 mt5 fc-grey">
          {
            search_loading
            ? <LoadingOutlined className="p0 m0 lh-none" />
              : <SearchOutlined className="p0 m0 lh-none" />
          }
        </div>
        <input
          className="h45--fixed"
          value={query}
          placeholder="Fortnite, Poker etc."
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </Dropdown>
  )
}

export const AppContainerHeaderSearchBar = withRouter(SearchBar)
