const express = require("express");

module.exports = function (config) {
  const router = express.Router();

  // TODO fix authentication and authorization for admin routes
  //committing a change to get the codeql to run

  // --- Admin Dashboard ---
  // Provides overview statistics for administrators.
  router.get("/dashboard", (req, res) => {
    console.log("Admin Dashboard accessed.");
    const dashboardData = {
      activeUsers: Math.floor(Math.random() * 200),
      pendingApprovals: Math.floor(Math.random() * 15),
      systemLoad: (Math.random() * 100).toFixed(1) + "%",
      lastLogin: new Date(Date.now() - 3600000).toLocaleString(),
    };
    res.json(dashboardData);
  });

  // --- User Management ---
  // Endpoint for administrative actions on users.
  router.post("/users/suspend/:userId", (req, res) => {
    const userId = req.params.userId;
    if (!/^[a-zA-Z0-9]+$/.test(userId)) {
      res
        .status(400)
        .send("Invalid User ID.");
    }
    console.log(`Admin request to suspend user ID: ${userId}`);
    res.send(`(Simulated) Suspension action processed for user ${userId}.`);
  });

  router.delete("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    if (!/^[a-zA-Z0-9]+$/.test(userId)) {
      res
        .status(400)
        .send("Invalid User ID.");
    } else {
      console.log(`Admin request to DELETE user ID: ${userId}`);
      res
        .status(200)
        .send(`(Simulated) Deletion action processed for user ${userId}.`);
    }
  });

  // --- System Logs Viewer ---
  // Recent system activity logs.
  router.get("/logs", (req, res) => {
    console.log("Admin request to view system logs.");
    const logs = [
      `[${new Date(
        Date.now() - 5 * 60000
      ).toISOString()}] INFO: User 'testuser' logged in.`,
      `[${new Date(
        Date.now() - 4 * 60000
      ).toISOString()}] WARN: Email service connection timed out.`,
      `[${new Date(
        Date.now() - 3 * 60000
      ).toISOString()}] INFO: Configuration updated by 'admin'.`,
      `[${new Date(
        Date.now() - 2 * 60000
      ).toISOString()}] ERROR: Database query failed: connection refused.`,
      `[${new Date(
        Date.now() - 1 * 60000
      ).toISOString()}] INFO: Health check passed.`,
    ];
    res.type("text/plain").send(logs.join("\n"));
  });

  return router;
};
// Trigger pipeline
