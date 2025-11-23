/**
 * Gamification and rewards system
 * Users earn badges and points for marketplace activities
 */

export const BADGE_TYPES = {
  FIRST_SALE: {
    id: 'first_sale',
    name: 'First Sale',
    description: 'Make your first successful sale',
    icon: '🎉',
    points: 100,
  },
  POWER_SELLER: {
    id: 'power_seller',
    name: 'Power Seller',
    description: 'Achieve 50+ successful sales',
    icon: '⭐',
    points: 500,
  },
  TRUSTED_BUYER: {
    id: 'trusted_buyer',
    name: 'Trusted Buyer',
    description: 'Complete 20+ purchases without disputes',
    icon: '✓',
    points: 300,
  },
  QUICK_RESPONDER: {
    id: 'quick_responder',
    name: 'Quick Responder',
    description: 'Respond to messages within 1 hour',
    icon: '⚡',
    points: 150,
  },
  PERFECT_RATING: {
    id: 'perfect_rating',
    name: 'Perfect Rating',
    description: 'Maintain 5-star rating with 10+ transactions',
    icon: '💎',
    points: 750,
  },
  LOAN_COMPLETER: {
    id: 'loan_completer',
    name: 'Loan Completer',
    description: 'Successfully repay a loan on time',
    icon: '💰',
    points: 400,
  },
  EARLY_BIRD: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Make a purchase within 24 hours of listing',
    icon: '🐦',
    points: 50,
  },
  COMMUNITY_HELPER: {
    id: 'community_helper',
    name: 'Community Helper',
    description: 'Help resolve 5 disputes as mediator',
    icon: '🤝',
    points: 600,
  },
};

/**
 * Award points to user
 */
export const awardPoints = async (userId, points, reason) => {
  try {
    // Store points in database
    console.log(`Awarded ${points} points to user ${userId}. Reason: ${reason}`);
    
    // In a real system, this would update user's points in the database
    // For now, we return the transaction
    return {
      userId,
      points,
      reason,
      timestamp: new Date(),
      success: true,
    };
  } catch (error) {
    console.error('Error awarding points:', error);
    throw error;
  }
};

/**
 * Award badge to user
 */
export const awardBadge = async (userId, badgeId) => {
  try {
    const badge = BADGE_TYPES[badgeId];
    
    if (!badge) {
      throw new Error(`Badge ${badgeId} not found`);
    }

    // Award both badge and points
    await awardPoints(userId, badge.points, `Earned badge: ${badge.name}`);

    console.log(`Awarded badge "${badge.name}" to user ${userId}`);

    // In a real system, this would update user's badges in the database
    return {
      userId,
      badge,
      awarded_at: new Date(),
      success: true,
    };
  } catch (error) {
    console.error('Error awarding badge:', error);
    throw error;
  }
};

/**
 * Check and award badges based on user activity
 */
export const checkAndAwardBadges = async (userId, userStats) => {
  const awardedBadges = [];

  try {
    // First Sale
    if (
      userStats.total_sales === 1 &&
      !userStats.badges?.includes('first_sale')
    ) {
      await awardBadge(userId, 'first_sale');
      awardedBadges.push('first_sale');
    }

    // Power Seller (50+ sales)
    if (
      userStats.total_sales >= 50 &&
      !userStats.badges?.includes('power_seller')
    ) {
      await awardBadge(userId, 'power_seller');
      awardedBadges.push('power_seller');
    }

    // Trusted Buyer (20+ purchases without disputes)
    if (
      userStats.total_purchases >= 20 &&
      userStats.disputes === 0 &&
      !userStats.badges?.includes('trusted_buyer')
    ) {
      await awardBadge(userId, 'trusted_buyer');
      awardedBadges.push('trusted_buyer');
    }

    // Perfect Rating (5-star with 10+ transactions)
    if (
      userStats.average_rating === 5 &&
      (userStats.total_sales + userStats.total_purchases) >= 10 &&
      !userStats.badges?.includes('perfect_rating')
    ) {
      await awardBadge(userId, 'perfect_rating');
      awardedBadges.push('perfect_rating');
    }

    // Loan Completer
    if (
      userStats.completed_loans > 0 &&
      userStats.loan_default_rate === 0 &&
      !userStats.badges?.includes('loan_completer')
    ) {
      await awardBadge(userId, 'loan_completer');
      awardedBadges.push('loan_completer');
    }

    // Community Helper
    if (
      userStats.disputes_resolved >= 5 &&
      !userStats.badges?.includes('community_helper')
    ) {
      await awardBadge(userId, 'community_helper');
      awardedBadges.push('community_helper');
    }

    return awardedBadges;
  } catch (error) {
    console.error('Error checking badges:', error);
    throw error;
  }
};

/**
 * Get user's total points
 */
export const getUserPoints = async (userId) => {
  try {
    // Fetch from database
    console.log('Fetching points for user:', userId);
    
    return {
      userId,
      totalPoints: 0,
      pointsHistory: [],
    };
  } catch (error) {
    console.error('Error fetching user points:', error);
    throw error;
  }
};

/**
 * Get user's badges
 */
export const getUserBadges = async (userId) => {
  try {
    // Fetch from database
    console.log('Fetching badges for user:', userId);
    
    return {
      userId,
      badges: [],
      badgeCount: 0,
    };
  } catch (error) {
    console.error('Error fetching user badges:', error);
    throw error;
  }
};

/**
 * Get user's achievement level based on points
 */
export const getUserLevel = (totalPoints) => {
  const levels = [
    { level: 1, minPoints: 0, maxPoints: 499, name: 'Newcomer', color: 'gray' },
    { level: 2, minPoints: 500, maxPoints: 1499, name: 'Trusted Member', color: 'blue' },
    { level: 3, minPoints: 1500, maxPoints: 3499, name: 'Expert Trader', color: 'green' },
    { level: 4, minPoints: 3500, maxPoints: 7499, name: 'Elite Seller', color: 'gold' },
    { level: 5, minPoints: 7500, maxPoints: Infinity, name: 'Marketplace Master', color: 'purple' },
  ];

  return levels.find(
    (l) => totalPoints >= l.minPoints && totalPoints <= l.maxPoints
  );
};

/**
 * Get points leaderboard
 */
export const getPointsLeaderboard = async (limit = 10) => {
  try {
    // Fetch from database
    console.log('Fetching points leaderboard');
    
    return {
      leaderboard: [],
      limit,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

/**
 * Get badge info
 */
export const getBadgeInfo = (badgeId) => {
  return BADGE_TYPES[badgeId] || null;
};

/**
 * Get all available badges
 */
export const getAllBadges = () => {
  return Object.values(BADGE_TYPES);
};

/**
 * Calculate points earned from transaction
 */
export const calculateTransactionPoints = (amount, isBuyer = false) => {
  let points = Math.floor(amount / 100); // 1 point per 100 KES
  
  if (isBuyer) {
    points = Math.floor(points * 0.5); // Buyers earn 50% of seller points
  }
  
  return Math.max(points, 10); // Minimum 10 points per transaction
};

export default {
  awardPoints,
  awardBadge,
  checkAndAwardBadges,
  getUserPoints,
  getUserBadges,
  getUserLevel,
  getPointsLeaderboard,
  getBadgeInfo,
  getAllBadges,
  calculateTransactionPoints,
  BADGE_TYPES,
};
