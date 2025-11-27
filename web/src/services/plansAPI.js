// Placeholder client-side plans API. Server implementation required.
// TODO: Implement real client that calls backend endpoint: POST /api/plans/start-trial
const plansAPI = {
  // Start a trial for a plan. Backend must create a trial record and return metadata.
  // This placeholder intentionally rejects so tests and developers notice missing backend.
  async startTrial(planKey, billingCycle = 'monthly') {
    // TODO: replace with real network call: return fetch('/api/plans/start-trial', ...)
    throw new Error('plansAPI.startTrial not implemented. TODO: Implement backend endpoint POST /api/plans/start-trial');
  },
};

export default plansAPI;
