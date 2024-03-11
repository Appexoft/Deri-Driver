import {Image} from 'react-native';

import cargo from '../../assets/common_icon/cargo.png';
import express from '../../assets/express_icon/express.png';
import packageIcon from '../../assets/package/package.png';

const icons = {
  cargo: Image.resolveAssetSource(cargo).uri,
  express: Image.resolveAssetSource(express).uri,
  packageIcon: Image.resolveAssetSource(packageIcon).uri,
};

export default icons;
