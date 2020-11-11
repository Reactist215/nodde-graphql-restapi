import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
  Decimal,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }
export { Decimal }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.10.2
 * Query Engine version: 7d0087eadc7265e12d4b8d8c3516b02c4c965111
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Links
 * const links = await prisma.link.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Links
   * const links = await prisma.link.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.link`: Exposes CRUD operations for the **Link** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Links
    * const links = await prisma.link.findMany()
    * ```
    */
  get link(): LinkDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.vote`: Exposes CRUD operations for the **Vote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Votes
    * const votes = await prisma.vote.findMany()
    * ```
    */
  get vote(): VoteDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const LinkDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  description: 'description',
  url: 'url',
  postedById: 'postedById'
};

export declare type LinkDistinctFieldEnum = (typeof LinkDistinctFieldEnum)[keyof typeof LinkDistinctFieldEnum]


export declare const UserDistinctFieldEnum: {
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  email: 'email',
  password: 'password'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const VoteDistinctFieldEnum: {
  id: 'id',
  linkId: 'linkId',
  userId: 'userId'
};

export declare type VoteDistinctFieldEnum = (typeof VoteDistinctFieldEnum)[keyof typeof VoteDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model Link
 */

export type Link = {
  id: number
  createdAt: Date
  description: string
  url: string
  postedById: number | null
}


export type AggregateLink = {
  count: number
  avg: LinkAvgAggregateOutputType | null
  sum: LinkSumAggregateOutputType | null
  min: LinkMinAggregateOutputType | null
  max: LinkMaxAggregateOutputType | null
}

export type LinkAvgAggregateOutputType = {
  id: number
  postedById: number | null
}

export type LinkSumAggregateOutputType = {
  id: number
  postedById: number | null
}

export type LinkMinAggregateOutputType = {
  id: number
  postedById: number | null
}

export type LinkMaxAggregateOutputType = {
  id: number
  postedById: number | null
}


export type LinkAvgAggregateInputType = {
  id?: true
  postedById?: true
}

export type LinkSumAggregateInputType = {
  id?: true
  postedById?: true
}

export type LinkMinAggregateInputType = {
  id?: true
  postedById?: true
}

export type LinkMaxAggregateInputType = {
  id?: true
  postedById?: true
}

export type AggregateLinkArgs = {
  where?: LinkWhereInput
  orderBy?: Enumerable<LinkOrderByInput> | LinkOrderByInput
  cursor?: LinkWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<LinkDistinctFieldEnum>
  count?: true
  avg?: LinkAvgAggregateInputType
  sum?: LinkSumAggregateInputType
  min?: LinkMinAggregateInputType
  max?: LinkMaxAggregateInputType
}

export type GetLinkAggregateType<T extends AggregateLinkArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetLinkAggregateScalarType<T[P]>
}

export type GetLinkAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof LinkAvgAggregateOutputType ? LinkAvgAggregateOutputType[P] : never
}
    
    

export type LinkSelect = {
  id?: boolean
  createdAt?: boolean
  description?: boolean
  url?: boolean
  postedBy?: boolean | UserArgs
  postedById?: boolean
  Vote?: boolean | FindManyVoteArgs
}

export type LinkInclude = {
  postedBy?: boolean | UserArgs
  Vote?: boolean | FindManyVoteArgs
}

export type LinkGetPayload<
  S extends boolean | null | undefined | LinkArgs,
  U = keyof S
> = S extends true
  ? Link
  : S extends undefined
  ? never
  : S extends LinkArgs | FindManyLinkArgs
  ? 'include' extends U
    ? Link  & {
      [P in TrueKeys<S['include']>]:
      P extends 'postedBy'
      ? UserGetPayload<S['include'][P]> | null :
      P extends 'Vote'
      ? Array<VoteGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Link ? Link[P]
: 
      P extends 'postedBy'
      ? UserGetPayload<S['select'][P]> | null :
      P extends 'Vote'
      ? Array<VoteGetPayload<S['select'][P]>> : never
    }
  : Link
: Link


export interface LinkDelegate {
  /**
   * Find zero or one Link that matches the filter.
   * @param {FindOneLinkArgs} args - Arguments to find a Link
   * @example
   * // Get one Link
   * const link = await prisma.link.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneLinkArgs>(
    args: Subset<T, FindOneLinkArgs>
  ): CheckSelect<T, Prisma__LinkClient<Link | null>, Prisma__LinkClient<LinkGetPayload<T> | null>>
  /**
   * Find the first Link that matches the filter.
   * @param {FindFirstLinkArgs} args - Arguments to find a Link
   * @example
   * // Get one Link
   * const link = await prisma.link.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstLinkArgs>(
    args?: Subset<T, FindFirstLinkArgs>
  ): CheckSelect<T, Prisma__LinkClient<Link | null>, Prisma__LinkClient<LinkGetPayload<T> | null>>
  /**
   * Find zero or more Links that matches the filter.
   * @param {FindManyLinkArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Links
   * const links = await prisma.link.findMany()
   * 
   * // Get first 10 Links
   * const links = await prisma.link.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const linkWithIdOnly = await prisma.link.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyLinkArgs>(
    args?: Subset<T, FindManyLinkArgs>
  ): CheckSelect<T, Promise<Array<Link>>, Promise<Array<LinkGetPayload<T>>>>
  /**
   * Create a Link.
   * @param {LinkCreateArgs} args - Arguments to create a Link.
   * @example
   * // Create one Link
   * const Link = await prisma.link.create({
   *   data: {
   *     // ... data to create a Link
   *   }
   * })
   * 
  **/
  create<T extends LinkCreateArgs>(
    args: Subset<T, LinkCreateArgs>
  ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>
  /**
   * Delete a Link.
   * @param {LinkDeleteArgs} args - Arguments to delete one Link.
   * @example
   * // Delete one Link
   * const Link = await prisma.link.delete({
   *   where: {
   *     // ... filter to delete one Link
   *   }
   * })
   * 
  **/
  delete<T extends LinkDeleteArgs>(
    args: Subset<T, LinkDeleteArgs>
  ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>
  /**
   * Update one Link.
   * @param {LinkUpdateArgs} args - Arguments to update one Link.
   * @example
   * // Update one Link
   * const link = await prisma.link.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends LinkUpdateArgs>(
    args: Subset<T, LinkUpdateArgs>
  ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>
  /**
   * Delete zero or more Links.
   * @param {LinkDeleteManyArgs} args - Arguments to filter Links to delete.
   * @example
   * // Delete a few Links
   * const { count } = await prisma.link.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends LinkDeleteManyArgs>(
    args: Subset<T, LinkDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Links.
   * @param {LinkUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Links
   * const link = await prisma.link.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends LinkUpdateManyArgs>(
    args: Subset<T, LinkUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Link.
   * @param {LinkUpsertArgs} args - Arguments to update or create a Link.
   * @example
   * // Update or create a Link
   * const link = await prisma.link.upsert({
   *   create: {
   *     // ... data to create a Link
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Link we want to update
   *   }
   * })
  **/
  upsert<T extends LinkUpsertArgs>(
    args: Subset<T, LinkUpsertArgs>
  ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyLinkArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateLinkArgs>(args: Subset<T, AggregateLinkArgs>): Promise<GetLinkAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Link.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__LinkClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  postedBy<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  Vote<T extends FindManyVoteArgs = {}>(args?: Subset<T, FindManyVoteArgs>): CheckSelect<T, Promise<Array<Vote>>, Promise<Array<VoteGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Link findOne
 */
export type FindOneLinkArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * Filter, which Link to fetch.
  **/
  where: LinkWhereUniqueInput
}


/**
 * Link findFirst
 */
export type FindFirstLinkArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * Filter, which Link to fetch.
  **/
  where?: LinkWhereInput
  orderBy?: Enumerable<LinkOrderByInput> | LinkOrderByInput
  cursor?: LinkWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<LinkDistinctFieldEnum>
}


/**
 * Link findMany
 */
export type FindManyLinkArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * Filter, which Links to fetch.
  **/
  where?: LinkWhereInput
  /**
   * Determine the order of the Links to fetch.
  **/
  orderBy?: Enumerable<LinkOrderByInput> | LinkOrderByInput
  /**
   * Sets the position for listing Links.
  **/
  cursor?: LinkWhereUniqueInput
  /**
   * The number of Links to fetch. If negative number, it will take Links before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Links.
  **/
  skip?: number
  distinct?: Enumerable<LinkDistinctFieldEnum>
}


/**
 * Link create
 */
export type LinkCreateArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * The data needed to create a Link.
  **/
  data: LinkCreateInput
}


/**
 * Link update
 */
export type LinkUpdateArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * The data needed to update a Link.
  **/
  data: LinkUpdateInput
  /**
   * Choose, which Link to update.
  **/
  where: LinkWhereUniqueInput
}


/**
 * Link updateMany
 */
export type LinkUpdateManyArgs = {
  data: LinkUpdateManyMutationInput
  where?: LinkWhereInput
}


/**
 * Link upsert
 */
export type LinkUpsertArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * The filter to search for the Link to update in case it exists.
  **/
  where: LinkWhereUniqueInput
  /**
   * In case the Link found by the `where` argument doesn't exist, create a new Link with this data.
  **/
  create: LinkCreateInput
  /**
   * In case the Link was found with the provided `where` argument, update it with this data.
  **/
  update: LinkUpdateInput
}


/**
 * Link delete
 */
export type LinkDeleteArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
  /**
   * Filter which Link to delete.
  **/
  where: LinkWhereUniqueInput
}


/**
 * Link deleteMany
 */
export type LinkDeleteManyArgs = {
  where?: LinkWhereInput
}


/**
 * Link without action
 */
export type LinkArgs = {
  /**
   * Select specific fields to fetch from the Link
  **/
  select?: LinkSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: LinkInclude | null
}



/**
 * Model User
 */

export type User = {
  id: number
  createdAt: Date
  name: string
  email: string
  password: string
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  createdAt?: boolean
  name?: boolean
  email?: boolean
  password?: boolean
  links?: boolean | FindManyLinkArgs
  Vote?: boolean | FindManyVoteArgs
}

export type UserInclude = {
  links?: boolean | FindManyLinkArgs
  Vote?: boolean | FindManyVoteArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'links'
      ? Array<LinkGetPayload<S['include'][P]>> :
      P extends 'Vote'
      ? Array<VoteGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'links'
      ? Array<LinkGetPayload<S['select'][P]>> :
      P extends 'Vote'
      ? Array<VoteGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args?: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  links<T extends FindManyLinkArgs = {}>(args?: Subset<T, FindManyLinkArgs>): CheckSelect<T, Promise<Array<Link>>, Promise<Array<LinkGetPayload<T>>>>;

  Vote<T extends FindManyVoteArgs = {}>(args?: Subset<T, FindManyVoteArgs>): CheckSelect<T, Promise<Array<Vote>>, Promise<Array<VoteGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Vote
 */

export type Vote = {
  id: number
  linkId: number
  userId: number
}


export type AggregateVote = {
  count: number
  avg: VoteAvgAggregateOutputType | null
  sum: VoteSumAggregateOutputType | null
  min: VoteMinAggregateOutputType | null
  max: VoteMaxAggregateOutputType | null
}

export type VoteAvgAggregateOutputType = {
  id: number
  linkId: number
  userId: number
}

export type VoteSumAggregateOutputType = {
  id: number
  linkId: number
  userId: number
}

export type VoteMinAggregateOutputType = {
  id: number
  linkId: number
  userId: number
}

export type VoteMaxAggregateOutputType = {
  id: number
  linkId: number
  userId: number
}


export type VoteAvgAggregateInputType = {
  id?: true
  linkId?: true
  userId?: true
}

export type VoteSumAggregateInputType = {
  id?: true
  linkId?: true
  userId?: true
}

export type VoteMinAggregateInputType = {
  id?: true
  linkId?: true
  userId?: true
}

export type VoteMaxAggregateInputType = {
  id?: true
  linkId?: true
  userId?: true
}

export type AggregateVoteArgs = {
  where?: VoteWhereInput
  orderBy?: Enumerable<VoteOrderByInput> | VoteOrderByInput
  cursor?: VoteWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<VoteDistinctFieldEnum>
  count?: true
  avg?: VoteAvgAggregateInputType
  sum?: VoteSumAggregateInputType
  min?: VoteMinAggregateInputType
  max?: VoteMaxAggregateInputType
}

export type GetVoteAggregateType<T extends AggregateVoteArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetVoteAggregateScalarType<T[P]>
}

export type GetVoteAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof VoteAvgAggregateOutputType ? VoteAvgAggregateOutputType[P] : never
}
    
    

export type VoteSelect = {
  id?: boolean
  link?: boolean | LinkArgs
  linkId?: boolean
  user?: boolean | UserArgs
  userId?: boolean
}

export type VoteInclude = {
  link?: boolean | LinkArgs
  user?: boolean | UserArgs
}

export type VoteGetPayload<
  S extends boolean | null | undefined | VoteArgs,
  U = keyof S
> = S extends true
  ? Vote
  : S extends undefined
  ? never
  : S extends VoteArgs | FindManyVoteArgs
  ? 'include' extends U
    ? Vote  & {
      [P in TrueKeys<S['include']>]:
      P extends 'link'
      ? LinkGetPayload<S['include'][P]> :
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Vote ? Vote[P]
: 
      P extends 'link'
      ? LinkGetPayload<S['select'][P]> :
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Vote
: Vote


export interface VoteDelegate {
  /**
   * Find zero or one Vote that matches the filter.
   * @param {FindOneVoteArgs} args - Arguments to find a Vote
   * @example
   * // Get one Vote
   * const vote = await prisma.vote.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneVoteArgs>(
    args: Subset<T, FindOneVoteArgs>
  ): CheckSelect<T, Prisma__VoteClient<Vote | null>, Prisma__VoteClient<VoteGetPayload<T> | null>>
  /**
   * Find the first Vote that matches the filter.
   * @param {FindFirstVoteArgs} args - Arguments to find a Vote
   * @example
   * // Get one Vote
   * const vote = await prisma.vote.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstVoteArgs>(
    args?: Subset<T, FindFirstVoteArgs>
  ): CheckSelect<T, Prisma__VoteClient<Vote | null>, Prisma__VoteClient<VoteGetPayload<T> | null>>
  /**
   * Find zero or more Votes that matches the filter.
   * @param {FindManyVoteArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Votes
   * const votes = await prisma.vote.findMany()
   * 
   * // Get first 10 Votes
   * const votes = await prisma.vote.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const voteWithIdOnly = await prisma.vote.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyVoteArgs>(
    args?: Subset<T, FindManyVoteArgs>
  ): CheckSelect<T, Promise<Array<Vote>>, Promise<Array<VoteGetPayload<T>>>>
  /**
   * Create a Vote.
   * @param {VoteCreateArgs} args - Arguments to create a Vote.
   * @example
   * // Create one Vote
   * const Vote = await prisma.vote.create({
   *   data: {
   *     // ... data to create a Vote
   *   }
   * })
   * 
  **/
  create<T extends VoteCreateArgs>(
    args: Subset<T, VoteCreateArgs>
  ): CheckSelect<T, Prisma__VoteClient<Vote>, Prisma__VoteClient<VoteGetPayload<T>>>
  /**
   * Delete a Vote.
   * @param {VoteDeleteArgs} args - Arguments to delete one Vote.
   * @example
   * // Delete one Vote
   * const Vote = await prisma.vote.delete({
   *   where: {
   *     // ... filter to delete one Vote
   *   }
   * })
   * 
  **/
  delete<T extends VoteDeleteArgs>(
    args: Subset<T, VoteDeleteArgs>
  ): CheckSelect<T, Prisma__VoteClient<Vote>, Prisma__VoteClient<VoteGetPayload<T>>>
  /**
   * Update one Vote.
   * @param {VoteUpdateArgs} args - Arguments to update one Vote.
   * @example
   * // Update one Vote
   * const vote = await prisma.vote.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends VoteUpdateArgs>(
    args: Subset<T, VoteUpdateArgs>
  ): CheckSelect<T, Prisma__VoteClient<Vote>, Prisma__VoteClient<VoteGetPayload<T>>>
  /**
   * Delete zero or more Votes.
   * @param {VoteDeleteManyArgs} args - Arguments to filter Votes to delete.
   * @example
   * // Delete a few Votes
   * const { count } = await prisma.vote.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends VoteDeleteManyArgs>(
    args: Subset<T, VoteDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Votes.
   * @param {VoteUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Votes
   * const vote = await prisma.vote.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends VoteUpdateManyArgs>(
    args: Subset<T, VoteUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Vote.
   * @param {VoteUpsertArgs} args - Arguments to update or create a Vote.
   * @example
   * // Update or create a Vote
   * const vote = await prisma.vote.upsert({
   *   create: {
   *     // ... data to create a Vote
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Vote we want to update
   *   }
   * })
  **/
  upsert<T extends VoteUpsertArgs>(
    args: Subset<T, VoteUpsertArgs>
  ): CheckSelect<T, Prisma__VoteClient<Vote>, Prisma__VoteClient<VoteGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyVoteArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateVoteArgs>(args: Subset<T, AggregateVoteArgs>): Promise<GetVoteAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Vote.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__VoteClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  link<T extends LinkArgs = {}>(args?: Subset<T, LinkArgs>): CheckSelect<T, Prisma__LinkClient<Link | null>, Prisma__LinkClient<LinkGetPayload<T> | null>>;

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Vote findOne
 */
export type FindOneVoteArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * Filter, which Vote to fetch.
  **/
  where: VoteWhereUniqueInput
}


/**
 * Vote findFirst
 */
export type FindFirstVoteArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * Filter, which Vote to fetch.
  **/
  where?: VoteWhereInput
  orderBy?: Enumerable<VoteOrderByInput> | VoteOrderByInput
  cursor?: VoteWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<VoteDistinctFieldEnum>
}


/**
 * Vote findMany
 */
export type FindManyVoteArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * Filter, which Votes to fetch.
  **/
  where?: VoteWhereInput
  /**
   * Determine the order of the Votes to fetch.
  **/
  orderBy?: Enumerable<VoteOrderByInput> | VoteOrderByInput
  /**
   * Sets the position for listing Votes.
  **/
  cursor?: VoteWhereUniqueInput
  /**
   * The number of Votes to fetch. If negative number, it will take Votes before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Votes.
  **/
  skip?: number
  distinct?: Enumerable<VoteDistinctFieldEnum>
}


/**
 * Vote create
 */
export type VoteCreateArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * The data needed to create a Vote.
  **/
  data: VoteCreateInput
}


/**
 * Vote update
 */
export type VoteUpdateArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * The data needed to update a Vote.
  **/
  data: VoteUpdateInput
  /**
   * Choose, which Vote to update.
  **/
  where: VoteWhereUniqueInput
}


/**
 * Vote updateMany
 */
export type VoteUpdateManyArgs = {
  data: VoteUpdateManyMutationInput
  where?: VoteWhereInput
}


/**
 * Vote upsert
 */
export type VoteUpsertArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * The filter to search for the Vote to update in case it exists.
  **/
  where: VoteWhereUniqueInput
  /**
   * In case the Vote found by the `where` argument doesn't exist, create a new Vote with this data.
  **/
  create: VoteCreateInput
  /**
   * In case the Vote was found with the provided `where` argument, update it with this data.
  **/
  update: VoteUpdateInput
}


/**
 * Vote delete
 */
export type VoteDeleteArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
  /**
   * Filter which Vote to delete.
  **/
  where: VoteWhereUniqueInput
}


/**
 * Vote deleteMany
 */
export type VoteDeleteManyArgs = {
  where?: VoteWhereInput
}


/**
 * Vote without action
 */
export type VoteArgs = {
  /**
   * Select specific fields to fetch from the Vote
  **/
  select?: VoteSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: VoteInclude | null
}



/**
 * Deep Input Types
 */


export type LinkWhereInput = {
  AND?: LinkWhereInput | Enumerable<LinkWhereInput>
  OR?: LinkWhereInput | Enumerable<LinkWhereInput>
  NOT?: LinkWhereInput | Enumerable<LinkWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  description?: StringFilter | string
  url?: StringFilter | string
  postedBy?: UserRelationFilter | UserWhereInput | null
  postedById?: IntNullableFilter | number | null
  Vote?: VoteListRelationFilter
}

export type LinkOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  description?: SortOrder
  url?: SortOrder
  postedById?: SortOrder
}

export type LinkWhereUniqueInput = {
  id?: number
}

export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  name?: StringFilter | string
  email?: StringFilter | string
  password?: StringFilter | string
  links?: LinkListRelationFilter
  Vote?: VoteListRelationFilter
}

export type UserOrderByInput = {
  id?: SortOrder
  createdAt?: SortOrder
  name?: SortOrder
  email?: SortOrder
  password?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type VoteWhereInput = {
  AND?: VoteWhereInput | Enumerable<VoteWhereInput>
  OR?: VoteWhereInput | Enumerable<VoteWhereInput>
  NOT?: VoteWhereInput | Enumerable<VoteWhereInput>
  id?: IntFilter | number
  link?: LinkRelationFilter | LinkWhereInput
  linkId?: IntFilter | number
  user?: UserRelationFilter | UserWhereInput
  userId?: IntFilter | number
}

export type VoteOrderByInput = {
  id?: SortOrder
  linkId?: SortOrder
  userId?: SortOrder
}

export type VoteWhereUniqueInput = {
  id?: number
  linkId_userId?: LinkIdUserIdCompoundUniqueInput
}

export type LinkCreateInput = {
  createdAt?: Date | string
  description: string
  url: string
  postedBy?: UserCreateOneWithoutLinksInput
  Vote?: VoteCreateManyWithoutLinkInput
}

export type LinkUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  url?: string | StringFieldUpdateOperationsInput
  postedBy?: UserUpdateOneWithoutLinksInput
  Vote?: VoteUpdateManyWithoutLinkInput
}

export type LinkUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  url?: string | StringFieldUpdateOperationsInput
}

export type UserCreateInput = {
  createdAt?: Date | string
  name: string
  email: string
  password: string
  links?: LinkCreateManyWithoutPostedByInput
  Vote?: VoteCreateManyWithoutUserInput
}

export type UserUpdateInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  links?: LinkUpdateManyWithoutPostedByInput
  Vote?: VoteUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
}

export type VoteCreateInput = {
  link: LinkCreateOneWithoutVoteInput
  user: UserCreateOneWithoutVoteInput
}

export type VoteUpdateInput = {
  link?: LinkUpdateOneRequiredWithoutVoteInput
  user?: UserUpdateOneRequiredWithoutVoteInput
}

export type VoteUpdateManyMutationInput = {

}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type UserRelationFilter = {
  is?: UserWhereInput | null
  isNot?: UserWhereInput | null
}

export type IntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type VoteListRelationFilter = {
  every?: VoteWhereInput
  some?: VoteWhereInput
  none?: VoteWhereInput
}

export type LinkListRelationFilter = {
  every?: LinkWhereInput
  some?: LinkWhereInput
  none?: LinkWhereInput
}

export type LinkRelationFilter = {
  is?: LinkWhereInput
  isNot?: LinkWhereInput
}

export type LinkIdUserIdCompoundUniqueInput = {
  linkId: number
  userId: number
}

export type UserCreateOneWithoutLinksInput = {
  create?: UserCreateWithoutLinksInput
  connect?: UserWhereUniqueInput
}

export type VoteCreateManyWithoutLinkInput = {
  create?: VoteCreateWithoutLinkInput | Enumerable<VoteCreateWithoutLinkInput>
  connect?: VoteWhereUniqueInput | Enumerable<VoteWhereUniqueInput>
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type UserUpdateOneWithoutLinksInput = {
  create?: UserCreateWithoutLinksInput
  connect?: UserWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: UserUpdateWithoutLinksDataInput
  upsert?: UserUpsertWithoutLinksInput
}

export type VoteUpdateManyWithoutLinkInput = {
  create?: VoteCreateWithoutLinkInput | Enumerable<VoteCreateWithoutLinkInput>
  connect?: VoteWhereUniqueInput | Enumerable<VoteWhereUniqueInput>
  set?: VoteWhereUniqueInput | Enumerable<VoteWhereUniqueInput>
  disconnect?: VoteWhereUniqueInput | Enumerable<VoteWhereUniqueInput>
  delete?: VoteWhereUniqueInput | Enumerable<VoteWhereUniqueInput>
  update?: VoteUpdateWithWhereUniqueWithoutLinkInput | Enumerable<VoteUpdateWithWhereUniqueWithoutLinkInput>
  updateMany?: VoteUpdateManyWithWhereNestedInput | Enumerable<VoteUpdateManyWithWhereNestedInput>
  deleteMany?: VoteScalarWhereInput | Enumerable<VoteScalarWhereInput>
  upsert?: VoteUpsertWithWhereUniqueWithoutLinkInput | Enumerable<VoteUpsertWithWhereUniqueWithoutLinkInput>
}

export type LinkCreateManyWithoutPostedByInput = {
  create?: LinkCreateWithoutPostedByInput | Enumerable<LinkCreateWithoutPostedByInput>
  connect?: LinkWhereUniqueInput | Enumerable<LinkWhereUniqueInput>
}

export type VoteCreateManyWithoutUserInput = {
  create?: VoteCreateWithoutUserInput | Enumerable<VoteCreateWithoutUserInput>
  connect?: VoteWhereUniqueInput | Enumerable<VoteWhereUniqueInput>
}

export type LinkUpdateManyWithoutPostedByInput = {
  create?: LinkCreateWithoutPostedByInput | Enumerable<LinkCreateWithoutPostedByInput>
  connect?: LinkWhereUniqueInput | Enumerable<LinkWhereUniqueInput>
  set?: LinkWhereUniqueInput | Enumerable<LinkWhereUniqueInput>
  disconnect?: LinkWhereUniqueInput | Enumerable<LinkWhereUniqueInput>
  delete?: LinkWhereUniqueInput | Enumerable<LinkWhereUniqueInput>
  update?: LinkUpdateWithWhereUniqueWithoutPostedByInput | Enumerable<LinkUpdateWithWhereUniqueWithoutPostedByInput>
  updateMany?: LinkUpdateManyWithWhereNestedInput | Enumerable<LinkUpdateManyWithWhereNestedInput>
  deleteMany?: LinkScalarWhereInput | Enumerable<LinkScalarWhereInput>
  upsert?: LinkUpsertWithWhereUniqueWithoutPostedByInput | Enumerable<LinkUpsertWithWhereUniqueWithoutPostedByInput>
}

export type VoteUpdateManyWithoutUserInput = {
  create?: VoteCreateWithoutUserInput | Enumerable<VoteCreateWithoutUserInput>
  connect?: VoteWhereUniqueInput | Enumerable<VoteWhereUniqueInput>
  set?: VoteWhereUniqueInput | Enumerable<VoteWhereUniqueInput>
  disconnect?: VoteWhereUniqueInput | Enumerable<VoteWhereUniqueInput>
  delete?: VoteWhereUniqueInput | Enumerable<VoteWhereUniqueInput>
  update?: VoteUpdateWithWhereUniqueWithoutUserInput | Enumerable<VoteUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: VoteUpdateManyWithWhereNestedInput | Enumerable<VoteUpdateManyWithWhereNestedInput>
  deleteMany?: VoteScalarWhereInput | Enumerable<VoteScalarWhereInput>
  upsert?: VoteUpsertWithWhereUniqueWithoutUserInput | Enumerable<VoteUpsertWithWhereUniqueWithoutUserInput>
}

export type LinkCreateOneWithoutVoteInput = {
  create?: LinkCreateWithoutVoteInput
  connect?: LinkWhereUniqueInput
}

export type UserCreateOneWithoutVoteInput = {
  create?: UserCreateWithoutVoteInput
  connect?: UserWhereUniqueInput
}

export type LinkUpdateOneRequiredWithoutVoteInput = {
  create?: LinkCreateWithoutVoteInput
  connect?: LinkWhereUniqueInput
  update?: LinkUpdateWithoutVoteDataInput
  upsert?: LinkUpsertWithoutVoteInput
}

export type UserUpdateOneRequiredWithoutVoteInput = {
  create?: UserCreateWithoutVoteInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutVoteDataInput
  upsert?: UserUpsertWithoutVoteInput
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedIntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type UserCreateWithoutLinksInput = {
  createdAt?: Date | string
  name: string
  email: string
  password: string
  Vote?: VoteCreateManyWithoutUserInput
}

export type VoteCreateWithoutLinkInput = {
  user: UserCreateOneWithoutVoteInput
}

export type UserUpdateWithoutLinksDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  Vote?: VoteUpdateManyWithoutUserInput
}

export type UserUpsertWithoutLinksInput = {
  update: UserUpdateWithoutLinksDataInput
  create: UserCreateWithoutLinksInput
}

export type VoteUpdateWithWhereUniqueWithoutLinkInput = {
  where: VoteWhereUniqueInput
  data: VoteUpdateWithoutLinkDataInput
}

export type VoteUpdateManyWithWhereNestedInput = {
  where: VoteScalarWhereInput
  data: VoteUpdateManyDataInput
}

export type VoteScalarWhereInput = {
  AND?: VoteScalarWhereInput | Enumerable<VoteScalarWhereInput>
  OR?: VoteScalarWhereInput | Enumerable<VoteScalarWhereInput>
  NOT?: VoteScalarWhereInput | Enumerable<VoteScalarWhereInput>
  id?: IntFilter | number
  linkId?: IntFilter | number
  userId?: IntFilter | number
}

export type VoteUpsertWithWhereUniqueWithoutLinkInput = {
  where: VoteWhereUniqueInput
  update: VoteUpdateWithoutLinkDataInput
  create: VoteCreateWithoutLinkInput
}

export type LinkCreateWithoutPostedByInput = {
  createdAt?: Date | string
  description: string
  url: string
  Vote?: VoteCreateManyWithoutLinkInput
}

export type VoteCreateWithoutUserInput = {
  link: LinkCreateOneWithoutVoteInput
}

export type LinkUpdateWithWhereUniqueWithoutPostedByInput = {
  where: LinkWhereUniqueInput
  data: LinkUpdateWithoutPostedByDataInput
}

export type LinkUpdateManyWithWhereNestedInput = {
  where: LinkScalarWhereInput
  data: LinkUpdateManyDataInput
}

export type LinkScalarWhereInput = {
  AND?: LinkScalarWhereInput | Enumerable<LinkScalarWhereInput>
  OR?: LinkScalarWhereInput | Enumerable<LinkScalarWhereInput>
  NOT?: LinkScalarWhereInput | Enumerable<LinkScalarWhereInput>
  id?: IntFilter | number
  createdAt?: DateTimeFilter | Date | string
  description?: StringFilter | string
  url?: StringFilter | string
  postedById?: IntNullableFilter | number | null
}

export type LinkUpsertWithWhereUniqueWithoutPostedByInput = {
  where: LinkWhereUniqueInput
  update: LinkUpdateWithoutPostedByDataInput
  create: LinkCreateWithoutPostedByInput
}

export type VoteUpdateWithWhereUniqueWithoutUserInput = {
  where: VoteWhereUniqueInput
  data: VoteUpdateWithoutUserDataInput
}

export type VoteUpsertWithWhereUniqueWithoutUserInput = {
  where: VoteWhereUniqueInput
  update: VoteUpdateWithoutUserDataInput
  create: VoteCreateWithoutUserInput
}

export type LinkCreateWithoutVoteInput = {
  createdAt?: Date | string
  description: string
  url: string
  postedBy?: UserCreateOneWithoutLinksInput
}

export type UserCreateWithoutVoteInput = {
  createdAt?: Date | string
  name: string
  email: string
  password: string
  links?: LinkCreateManyWithoutPostedByInput
}

export type LinkUpdateWithoutVoteDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  url?: string | StringFieldUpdateOperationsInput
  postedBy?: UserUpdateOneWithoutLinksInput
}

export type LinkUpsertWithoutVoteInput = {
  update: LinkUpdateWithoutVoteDataInput
  create: LinkCreateWithoutVoteInput
}

export type UserUpdateWithoutVoteDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  name?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  password?: string | StringFieldUpdateOperationsInput
  links?: LinkUpdateManyWithoutPostedByInput
}

export type UserUpsertWithoutVoteInput = {
  update: UserUpdateWithoutVoteDataInput
  create: UserCreateWithoutVoteInput
}

export type VoteUpdateWithoutLinkDataInput = {
  user?: UserUpdateOneRequiredWithoutVoteInput
}

export type VoteUpdateManyDataInput = {

}

export type LinkUpdateWithoutPostedByDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  url?: string | StringFieldUpdateOperationsInput
  Vote?: VoteUpdateManyWithoutLinkInput
}

export type LinkUpdateManyDataInput = {
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  url?: string | StringFieldUpdateOperationsInput
}

export type VoteUpdateWithoutUserDataInput = {
  link?: LinkUpdateOneRequiredWithoutVoteInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
