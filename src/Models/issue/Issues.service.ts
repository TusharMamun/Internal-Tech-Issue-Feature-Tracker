import { pool } from "../../db"
import type { TtypePayload, TUpdateIssuePayload } from "./issue.type"

const creataIssuIntoDb = async (payload: TtypePayload, reporter_id: string) => {
  const { title, description, type } = payload

  const result = await pool.query(
    `
    INSERT INTO issues(
      title,
      description,
      type,
      status,
      reporter_id,
      created_at,
      updated_at
    )
    VALUES(
      $1,
      $2,
      $3,
      'open',
      $4,
      NOW(),
      NOW()
    )
    RETURNING *
    `,
    [title, description, type, Number(reporter_id)]
  )

  return result.rows[0]
}
const singleIssu = async (id: string) => {
  const result = await pool.query(
    `
    SELECT
      issues.id,
      issues.title,
      issues.description,
      issues.type,
      issues.status,
      issues.created_at,
      issues.updated_at,

      users.id AS reporter_id,
      users.name AS reporter_name,
      users.role AS reporter_role

    FROM issues
    JOIN users
    ON issues.reporter_id = users.id
    WHERE issues.id = $1
    `,
    [Number(id)]
  )

  const row = result.rows[0]

  if (!row) return null

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    type: row.type,
    status: row.status,

    reporter: {
      id: row.reporter_id,
      name: row.reporter_name,
      role: row.reporter_role
    },

    created_at: row.created_at,
    updated_at: row.updated_at
  }
}

const updateIssu = async (payload: TUpdateIssuePayload, id: string) => {
  const { title, description, type } = payload

  const result = await pool.query(
    `
    UPDATE issues
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      type = COALESCE($3, type),
      updated_at = NOW()
    WHERE id = $4
    RETURNING *
    `,
    [title, description, type, id]
  )

  return result.rows[0]
}
const DeletIssueInDb=async(id:string)=>{
const result = await pool.query(
  `
  DELETE FROM issues
  WHERE id = $1
  RETURNING *
  `,
  [id]
)

return result.rows[0]
}


const getAllysrDatainDb=async(filters:{
    sort?: string
  type?: string
  status?: string
})=>{
  const conditions: string[] = []
  const values: any[] = []

  let query = `SELECT * FROM issues`

  // 🔹 Filter by type
  if (filters.type) {
    values.push(filters.type)
    conditions.push(`type = $${values.length}`)
  }

  // 🔹 Filter by status
  if (filters.status) {
    values.push(filters.status)
    conditions.push(`status = $${values.length}`)
  }

  // 🔹 Add WHERE clause
  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ")
  }

  // 🔹 Sorting
  if (filters.sort === "oldest") {
    query += ` ORDER BY created_at ASC`
  } else {
    query += ` ORDER BY created_at DESC`
  }

  const result = await pool.query(query, values)

  return result.rows
}



export const issuService = {
  creataIssuIntoDb,singleIssu,updateIssu,DeletIssueInDb,getAllysrDatainDb
}
