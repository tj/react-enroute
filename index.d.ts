import {
  ParseOptions,
  RegexpToFunctionOptions,
  TokensToFunctionOptions,
  TokensToRegexpOptions,
} from 'path-to-regexp'
import {FunctionComponent} from 'react'

export declare type RouterProps = {
  location: string|undefined|null,
  options?: ParseOptions & TokensToRegexpOptions & RegexpToFunctionOptions,
}

export declare const Router: FunctionComponent<RouterProps>

export declare function genLocation(
  path: string,
  params: object,
  options?: ParseOptions & TokensToFunctionOptions,
): string

export declare function loc(
  path: string,
  params: object,
  options?: ParseOptions & TokensToFunctionOptions,
): string

export declare function isPath(
  path: string,
  location: string,
  options?: TokensToRegexpOptions & ParseOptions,
): boolean

export declare type SearchResult = {
  path: string,
  value: any,
  params: object[],
}

export declare function findByLocation(
  obj: object,
  location: string,
  options?: ParseOptions & TokensToRegexpOptions & RegexpToFunctionOptions,
): SearchResult|void
