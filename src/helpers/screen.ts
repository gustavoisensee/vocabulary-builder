import { COLORS } from '../consts/colors';

interface hsType {
  backgroundColor: string;
}

interface htsType {
  fontWeight: string;
  fontSize: number;
}

interface oType {
  headerStyle: hsType;
  headerTintColor: string;
  headerTitleStyle: htsType;
}

export const options: oType = {
  headerStyle: {
    backgroundColor: COLORS.fullBlack
  },
  headerTintColor: COLORS.white,
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 22
  }
};

export default options;
