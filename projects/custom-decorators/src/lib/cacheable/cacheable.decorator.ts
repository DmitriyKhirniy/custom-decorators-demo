import { serializeObject } from './cacheable.constant';

export function Cacheable(cacheKey: string, useParamsAsKeys = false, maxAge?: number, serializer?: Function, async = true): Function {
  return function(target, key: string, descriptor): void {

    /* save a reference to the original method this way we keep the values currently in the
     * descriptor and don't overwrite what another decorator might have done to the descriptor.
     */
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    const originalMethod = descriptor.value;

    descriptor.value = function(...args): Function {

      let saveKey: string = cacheKey;

      if (!this.cacheService) {
        throw new Error("Class with 'RequestCache' decorator should have 'cacheService' class property with 'RequestCacheService' class.");
      }

      if (useParamsAsKeys) {
        saveKey = `${saveKey}-${serializeObject(...args)}`;
      }

      if (serializer) {
        saveKey = `${saveKey}-${serializer(Array.from(args))}`;
      }

      /*Checking cache if something exist with key*/
      let cacheResult = null;

      if (async) {
        cacheResult = this.cacheService.get(saveKey, originalMethod.apply(this, args), maxAge);
      } else {
        cacheResult = this.cacheService.get(saveKey);
      }

      if (cacheResult) {
        return cacheResult;
      }

      /*Getting real method result*/
      const result = originalMethod.apply(this, args);

      this.cacheService.set(saveKey, result, maxAge);

      return result;
    };

    /*return edited descriptor as opposed to overwriting the descriptor*/
    return descriptor;
  };
}
