import React from 'react';
import T from 'prop-types';
import { Image, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import placeholder from '../../../assets/photo-placeholder.png';
// NOTE: module css example
// When import from css module, it resolves to something like that
// styles = {
//   container: "InputImage_container__4H_Sr"
//   image: "InputImage_image__9U_Ck"
// }
import styles from './InputImage.module.css';

class InputImage extends React.Component {
  state = {
    src: placeholder,
  };

  inputRef = React.createRef(null);

  readFile = file => {
    const { onChange } = this.props;
    const setSrc = src =>
      this.setState({ src }, () => {
        if (onChange) onChange(file);
      });

    if (!file) {
      setSrc(placeholder);
    } else {
      const reader = new FileReader();
      reader.onload = function () {
        setSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  handleClick = () => {
    const { src } = this.state;
    const { current: fileInput } = this.inputRef;
    if (src === placeholder) {
      fileInput.click();
    }
  };

  handleDeleteClick = () => {
    const { current: fileInput } = this.inputRef;
    fileInput.value = null;
    this.readFile(null);
  };

  handleChange = ev => {
    const [file] = ev.target.files;
    this.readFile(file);
  };

  render() {
    const { onChange, ...props } = this.props;
    const { src } = this.state;

    const isSrcLoaded = src !== placeholder;

    return (
      <React.Fragment>
        <input
          type="file"
          accept="image/png, image/jpeg, image/gif"
          ref={this.inputRef}
          onChange={this.handleChange}
          style={{ display: 'none' }}
          {...props}
        />
        {/*
          styles.container is a unique class name,
          something like "InputImage_container__9U_Ck"
        */}
        <div className={styles.container}>
          <Image
            className={styles.image}
            fallback={placeholder}
            height={200}
            preview={isSrcLoaded}
            src={src}
            width={200}
            onClick={this.handleClick}
          />
          {isSrcLoaded && (
            <div className={styles.overlay}>
              <Button
                type="primary"
                className={styles.button}
                danger
                icon={<DeleteOutlined />}
                onClick={this.handleDeleteClick}
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

InputImage.propTypes = {
  onChange: T.func,
};

export default InputImage;
