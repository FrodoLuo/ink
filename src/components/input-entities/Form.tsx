import * as React from 'react';
import { InkInput } from './Inputs';
import './form.less';
import InkButton from './Button';

export interface Field {
  fieldType: 'field';
  name: string;
  required: boolean;
  type: string;
  rules: Array<{
    validator: (value: string) => boolean;
    hint: string;
  }>;
  icon?: string;
  button?: boolean;
}
export interface ButtonField {
  fieldType: 'button';
  text: string;
  loading: boolean;
  type: string;
  styleType: string | null;
}
interface FormProps {
  onSubmit: (object: any) => void;
  children: Array<Field | ButtonField>;
}

export class InkForm extends React.Component<FormProps> {
  public state = {
    targetForm: {},
  };
  public handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSubmit(this.state.targetForm);
  }
  public render() {
    return (
      <form className="ink" onSubmit={this.handleSubmit}>
        {
          this.props.children.map((f: Field | ButtonField) => {
            switch (f.fieldType) {
              case 'field':
                return (
                  <div
                    key={f.name}
                    className="ink form-input-wrapper"
                  >
                    {f.icon ? <i className={`iconfont icon-${f.icon}`} /> : null}
                    <InkInput
                      onChange={(value) => {
                        this.setState({
                          targetForm: {
                            ...this.state.targetForm,
                            [f.name]: value,
                          }
                        });
                      }}
                      type={f.type}
                    />
                  </div>
                );
              case 'button':
                return (
                  <div
                    key={f.type}
                  >
                    <InkButton
                      onClick={f.type === 'submit' ? this.handleSubmit : void (0)}
                      loading={f.loading}
                    >
                      {f.text}
                    </InkButton>
                  </div>
                );
            }
          })
        }
      </form>
    );
  }
}

export function field(
  name: string,
  type?: string,
  icon?: string,
  required?: boolean,
  rules?: Array<{
    validator: (value: string) => boolean;
    hint: string;
  }>
): Field {
  return {
    name,
    type: type || 'text',
    required: required || false,
    rules: rules || [],
    icon,
    fieldType: 'field',
  };
}

export function btn(
  text: string,
  type?: string,
  style?: string,
  loading?: boolean,
): ButtonField {
  return {
    text,
    type: type || 'submit',
    loading: loading || false,
    styleType: style || null,
    fieldType: 'button',
  };
}