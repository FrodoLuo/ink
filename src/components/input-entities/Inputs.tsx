import * as React from 'react';
import './input.less';

interface InputComponentProps {
  onChange?: (value: string) => void;
  onEnter?: (event: React.KeyboardEvent) => void;
  onCommit?: (value: string) => void;
  icon?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
}

export function InkInput(props: InputComponentProps) {
  let value = props.value || '';
  return (() => {
    return (
      <span className="ink input-wrapper">
        <input
          className={`ink ${props.icon ? 'iconed' : ''} ${props.className || ''}`}
          onChange={(e) => {
            value = e.currentTarget.value;
            if (props.onChange) {
              props.onChange(e.target.value);
            }
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') { if (props.onEnter) { props.onEnter(e); } }
          }}
          type={props.type}
          placeholder={props.placeholder}
          defaultValue={value}
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
interface TextAreaProps extends InputComponentProps {
  resizable?: boolean;
}
export function TextArea(props: TextAreaProps) {
  return (
    <textarea
      className={`ink ${props.className || ''}`}
      {...props}
      onChange={(e) => {
        if (props.onChange) {
          props.onChange(e.target.value);
        }
      }}
      value={props.value || ''}
    />
  );
}

export function SearchInput() {
  return (
    <InkInput
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