// interfaces.ts
import { ParamListBase, RouteProp } from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
    Login: undefined; // No parameters for Login
    Profile: undefined; // No parameters for Profile
  }

// Define route prop interfaces if needed
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
