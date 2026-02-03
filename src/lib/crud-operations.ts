
import { createPostgrestClient } from "./postgrest";
import { validateEnv } from "./api-utils";

/**
 * Utility class for common CRUD operations with PostgREST
 */
export default class CrudOperations {
  private token?: string;

  constructor(private tableName: string, token?: string) {
    this.token = token;
  }

  private get client() {
    const client = createPostgrestClient();
    
    // If a token is provided, set it in the Authorization header
    if (this.token) {
      client.headers.set("Authorization", `Bearer ${this.token}`);
    }
    
    return client;
  }

  /**
   * Fetches multiple records with optional filtering, sorting, and pagination
   */
  async findMany(
    filters?: Record<string, any>,
    params?: {
      limit?: number;
      offset?: number;
      orderBy?: {
        column: string;
        direction: "asc" | "desc";
      };
    },
  ) {
    validateEnv();
    const { limit, offset, orderBy } = params || {};

    let query = this.client
      .from(this.tableName)
      .select("*")

    if (orderBy) {
      query = query.order(orderBy.column, {
        ascending: orderBy.direction === "asc",
      });
    }

    if (filters) {
      console.log(`[CrudOperations] Applying filters to ${this.tableName}:`, JSON.stringify(filters));
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
          console.log(`[CrudOperations] Applied filter: ${key} = ${value}`);
        }
      });
    }

    if (limit && offset !== undefined) {
      query = query.range(offset, offset + limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`[CrudOperations] Query error for ${this.tableName}:`, error);
      throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`);
    }

    console.log(`[CrudOperations] Query successful for ${this.tableName}, returned ${data?.length || 0} rows`);
    return data;
  }

  /**
   * Fetches a single record by its ID
   */
  async findById(id: string | number) {
    validateEnv();

    const { data, error } = await this.client
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(
        `Failed to fetch ${this.tableName} by id: ${error.message}`
      );
    }

    return data;
  }

  /**
   * Creates a new record in the table
   */
  async create(data: Record<string, any>) {
    validateEnv();
      
    const res = await this.client
      .from(this.tableName)
      .insert([data])
      .select()
      .single();

    const { data: result, error } = res;

    if (error) {
      throw new Error(`Failed to create ${this.tableName}: ${error.message}`);
    }

    return result;
  }

  /**
   * Updates an existing record by ID
   */
  async update(
    id: string | number,
    data: Record<string, any>
  ) {
    validateEnv();

    const { data: result, error } = await this.client
      .from(this.tableName)
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update ${this.tableName}: ${error.message}`);
    }

    return result;
  }

  /**
   * Deletes a record by ID
   */
  async delete(id: string | number) {
    validateEnv();

    const { error } = await this.client.from(this.tableName).delete().eq("id", id);

    if (error) {
      throw new Error(`Failed to delete ${this.tableName}: ${error.message}`);
    }

    return { id };
  }
}
