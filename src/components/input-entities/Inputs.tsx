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

interface TagInputState {
  tags: string[];
  currentTag: string;
  initialized: boolean;
}
interface TagInputProps {
  onChange?: (tags: string) => any;
  initialTags?: string;
}
export class TagInput extends React.Component<TagInputProps> {
  public state: TagInputState = {
    tags: [],
    currentTag: '',
    initialized: false,
  };

  public componentWillReceiveProps() {
    if (this.props.initialTags && !this.state.initialized) {
      this.setState({
        tags: this.props.initialTags.split(' '),
        initialized: true,
      });
    }
  }
  public renderTags = () => {
    const list = this.state.tags.map(tag => {
      return (
        <span className="tag" key={tag}>
          {tag}
        </span>
      );
    });
    return list;
  }

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== ' ' && e.target.value.length <= 10) {
      const list = this.state.tags;
      if (this.props.onChange && e.target.value.length > 0) {
        this.props.onChange(list.concat(e.target.value).join(' '));
      }
      this.setState({
        currentTag: e.target.value,
      });
    }
  }

  public handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 32 && this.state.currentTag.length > 0) {
      if (!this.state.tags.find(i => i === this.state.currentTag)) {
        const list = this.state.tags;
        this.setState({
          tags: list.concat(this.state.currentTag),
          currentTag: '',
        });
        if(this.props.onChange) {
          this.props.onChange(list.concat(this.state.currentTag).join(' '));
        }
      }
      e.preventDefault();
    } else if (e.keyCode === 8 && this.state.currentTag === '' && this.state.tags.length > 0) {
      const list = this.state.tags;
      const current = list.pop();
      this.setState({
        tags: list,
        currentTag: current,
      });
    }
  }

  public render() {
    return (
      <div className="tag-input-wrapper">
        {this.renderTags()}
        <span className="input"><input placeholder="标签" value={this.state.currentTag} onKeyDown={this.handleKeyPress} onChange={this.handleChange} /></span>
      </div>
    );
  }
}