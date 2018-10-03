import * as React from 'react';
import './input.less';

interface InputComponentProps {
  onChange?: (event: React.ChangeEvent) => void;
  onEnter?: (event: React.KeyboardEvent) => void;
  onCommit?: (value: string) => void;
  icon?: string;
}

export function Input(props: InputComponentProps) {
  let value = '';
  return (() => {
    return (
      <span className="ink input-wrapper">
        <input
          className="ink"
          onChange={(e) => {
            value = e.currentTarget.value;
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') { if (props.onEnter) { props.onEnter(e); } }
          }}
        />
        {props.icon ?
          <i onClick={() => {
            if (props.onCommit) {
              props.onCommit(value);
            }
          }} className={`ink input iconfont icon-${props.icon}`} />
          :
          null}
      </span>
    );
  })();
}

export function SearchInput() {
  return (
    <Input
      icon="search"
      onEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
      }}
      onCommit={(value) => {
        console.log(value);
      }}
    />
  );
}