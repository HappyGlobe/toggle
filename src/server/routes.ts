import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { users, entries } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Get all entries
  app.get("/api/entries", async (_req, res) => {
    try {
      const allEntries = await db.select().from(entries);
      res.json(allEntries);
    } catch (error) {
      res.status(500).send("Failed to fetch entries");
    }
  });

  // Get single entry
  app.get("/api/entries/:id", async (req, res) => {
    try {
      const entry = await db.select().from(entries).where(eq(entries.id, parseInt(req.params.id)));
      if (entry.length === 0) {
        return res.status(404).send("Entry not found");
      }
      res.json(entry[0]);
    } catch (error) {
      res.status(500).send("Failed to fetch entry");
    }
  });

  // Create entry
  app.post("/api/entries", async (req, res) => {
    try {
      const { userId, happinessLevel, location, country, region } = req.body;
      const newEntry = await db.insert(entries)
        .values({ 
          userId, 
          happinessLevel, 
          location,
          country,
          region
        })
        .returning();
      res.status(201).json(newEntry[0]);
    } catch (error) {
      res.status(500).send("Failed to create entry");
    }
  });

  // Update entry
  app.put("/api/entries/:id", async (req, res) => {
    try {
      const { happinessLevel, location, country, region } = req.body;
      const updatedEntry = await db
        .update(entries)
        .set({ 
          happinessLevel, 
          location,
          country,
          region
        })
        .where(eq(entries.id, parseInt(req.params.id)))
        .returning();

      if (updatedEntry.length === 0) {
        return res.status(404).send("Entry not found");
      }
      res.json(updatedEntry[0]);
    } catch (error) {
      res.status(500).send("Failed to update entry");
    }
  });

  // Delete entry
  app.delete("/api/entries/:id", async (req, res) => {
    try {
      const deletedEntry = await db
        .delete(entries)
        .where(eq(entries.id, parseInt(req.params.id)))
        .returning();

      if (deletedEntry.length === 0) {
        return res.status(404).send("Entry not found");
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).send("Failed to delete entry");
    }
  });
  // Get all users
  app.get("/api/users", async (_req, res) => {
    try {
      const allUsers = await db.select().from(users);
      res.json(allUsers);
    } catch (error) {
      res.status(500).send("Failed to fetch users");
    }
  });

  // Get single user
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await db.select().from(users).where(eq(users.id, parseInt(req.params.id)));
      if (user.length === 0) {
        return res.status(404).send("User not found");
      }
      res.json(user[0]);
    } catch (error) {
      res.status(500).send("Failed to fetch user");
    }
  });

  // Create user
  app.post("/api/users", async (req, res) => {
    try {
      const { username } = req.body;
      const newUser = await db.insert(users).values({ username }).returning();
      res.status(201).json(newUser[0]);
    } catch (error) {
      res.status(500).send("Failed to create user");
    }
  });

  // Update user
  app.put("/api/users/:id", async (req, res) => {
    try {
      const { username, password } = req.body;
      const updateData: { username: string; password?: string } = { username };
      if (password) {
        updateData.password = password;
      }
      
      const updatedUser = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, parseInt(req.params.id)))
        .returning();

      if (updatedUser.length === 0) {
        return res.status(404).send("User not found");
      }
      res.json(updatedUser[0]);
    } catch (error) {
      res.status(500).send("Failed to update user");
    }
  });

  // Delete user
  app.delete("/api/users/:id", async (req, res) => {
    try {
      const deletedUser = await db
        .delete(users)
        .where(eq(users.id, parseInt(req.params.id)))
        .returning();

      if (deletedUser.length === 0) {
        return res.status(404).send("User not found");
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).send("Failed to delete user");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
