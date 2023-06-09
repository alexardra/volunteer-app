import { IUser, IUserDto, PersonaRoleTypes } from '@/interfaces/personas';

export default class UserMapper {
  static toDTO(user: IUser) {
    const userDto = {} as IUserDto;

    userDto.id = user._id;
    userDto.email = user.email;
    userDto.firstname = user.firstname;
    userDto.lastname = user.lastname;
    userDto.verificationStatus = user.verificationStatus;
    userDto.role = PersonaRoleTypes.USER;
    userDto.userRole = user.role;

    return userDto;
  }
}
