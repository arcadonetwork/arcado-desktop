import React, { ChangeEvent, useRef, useState } from 'react';

import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'

import Menu from 'antd/es/menu';
import { Dropdown } from 'antd';
import _ from 'lodash';
import Input from 'antd/es/input';
import { isArrayWithElements } from '../../utils/type-checking';
import { Avatar } from '../avatar';


interface ContainerProps {
  search(value: string): Promise<SearchResult[]>
  onKeyPress(value: any): void
  fieldLabel: string
}

type SearchResult = {
  label: string
  value: string
}

export const HallarSearchBar: React.FC<ContainerProps> = ({ search, onKeyPress, fieldLabel }) => {

  const delayedQuery = useRef(_.debounce(q => searchQuery(q), 750)).current
  const [query, setQuery] = useState<string>();
  const [search_loading, setSearchLoading] = useState<boolean>();
  const [result, setResult] = useState<any[]>([]);

  function onBlur () {
    setResult([])
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    delayedQuery(event.target.value)
  }

  async function searchQuery(value: string) {
    if (value.length <= 1) return;
    setResult([]);
    setSearchLoading(true);
    let result: SearchResult[] = [];
    try {
      result = await search(value);
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
              onMouseDown={() => onKeyPress(item)}
              className="search--menu-item br5 w100 click hover">
              <div className="mr10">
                <Avatar url={item.avatar_url} size="s" label={item[fieldLabel]} type="circle" />
              </div>
              <div className="w100">
                <div className="fc-lb ffm-bold">{item[fieldLabel]}</div>
                <div className="fc-grey fs-s">id: {item.id}</div>
              </div>
            </Menu.Item>
          ))}
        </Menu>
      }>
      <Input
        prefix={
          search_loading
            ? <LoadingOutlined />
            : <SearchOutlined />
        }
        className="h45--fixed"
        value={query}
        placeholder="Fortnite, Poker etc."
        onChange={onChange}
        onBlur={onBlur}
      />
    </Dropdown>
  )
}
