import * as React from 'react';
import { Image } from 'react-native';
import IconType from './IconType';
import PropTypes from 'prop-types';
/**
 *
 * @typedef {"close_black" | "user_black" | "setting_white" | "plus_white" | "location_white" | "warning" | "phone_white" | "back_white" | "arrow_back_white" | "doc" | "electronic_signature" | "inquiry" | "recruiter_doc" | "new" | ""} name
 */

/**
 * @param {string} name
 */
const Icon = ({ name, style }) => {
  const [imgUrl, setImgUrl] = React.useState(undefined);
  const getIcon = () => {
    if (name === undefined) return;

    let imgSource = IconType[name];

    if (imgSource) setImgUrl(imgSource);
  };

  React.useEffect(() => {
    getIcon();
  }, [name]);

  if (imgUrl === undefined) return null;

  return <Image style={style} source={imgUrl} />;
};

Icon.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object,
};

Icon.defaultProps = {
  name: '',
  style: {
    width: 50,
    height: 50,
  },
};

export default Icon;
