import React from "react";

type Props = {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => void;
  onChangeArgs?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => [React.ChangeEvent<HTMLInputElement>, string];
};

class CustomInput extends React.Component<Props> {
  onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let args: [React.ChangeEvent<HTMLInputElement>, string] = [
      event,
      event.target.value,
    ];
    if (this.props.onChangeArgs) {
      args = this.props.onChangeArgs(event);
    }
    this.props.onChange?.apply(this, args);
  };

  render() {
    const { ...props } = this.props;
    delete props.onChangeArgs;
    return <input {...props} onChange={this.onChange} />;
  }
}

export default CustomInput;
