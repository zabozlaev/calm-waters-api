export interface Profile {
  provider: string;
  id: string;
  name: {
    givenName: string;
    familyName: string;
  };
  displayName: string;
  photos: Array<{
    value: string;
  }>;
  _raw: string;
  _json: JSON;
}
