import { container } from 'tsyringe';
import BcryptHashProvider from './hash/implementations/BcryptHashProvider';
import { IHashProvider } from './hash/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
