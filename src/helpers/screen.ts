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
    backgroundColor: '#111'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 22
  }
};

export default options;
