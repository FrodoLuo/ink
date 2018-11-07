import * as React from 'react';
import { InkInput, TextArea } from './Inputs';
import './form.less';
import InkButton from './Button';

export interface Field {
  fieldType?: 'field' | 'textarea';
  name: string;
  required?: boolean;
  type?: string;
  rules?: Array<{
    validator: (value: string) => boolean;
    hint: string;
  }>;
  placeholder?: string;
  label?: string;
  icon?: string;
  button?: boolean;
}
export interface ButtonField {
  text: string;
  fieldType?: 'button';
  loading?: boolean;
  type?: string;
  styleType?: string;
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
                    {f.label ? <span>{f.label}</span> : null}
                    <InkInput
                      onChange={(value) => {
                        this.setState({
                          targetForm: {
                            ...this.state.targetForm,
                            [f.name]: value,
                          }
                        });
                      }}
                      placeholder={f.placeholder}
                      type={f.type}
                    />
                  </div>
                );
              case 'textarea':
                return (
                  <div
                    key={f.name}
                    className="ink form-input-wrapper"
                  >
                    {f.icon ? <i className={`iconfont icon-${f.icon}`} /> : null}
                    {f.label ? <span>{f.label}</span> : null}
                    <TextArea
                      onChange={(value) => {
                        console.log(value);
                        this.setState({
                          targetForm: {
                            ...this.state.targetForm,
                            [f.name]: value,
                          }
                        });
                      }}
                      type={f.type}
                      value={this.state.targetForm[f.name]}
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
                      type={f.styleType || ''}
                      loading={f.loading}
                    >
                      {f.text}
                    </InkButton>
                  </div>
                );
              default:
                return null;
            }
          })
        }
      </form>
    );
  }
}

export function field(
  options: Field
): Field {
  return {
    fieldType: 'field',
    ...options,
  };
}

export function btn(
  options: ButtonField
): ButtonField {
  return {
    fieldType: 'button',
    ...options,
  };
}

export function textArea(
  options: Field
): Field {
  return {
    type: 'text',
    ...options,
    fieldType: 'textarea',
  };
}