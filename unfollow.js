// Configuration object to keep settings centralized
const CONFIG = {
  LANGUAGE: 'EN',
  UNFOLLOW_FOLLOWERS: false,
  MS_PER_CYCLE: 10,
  MAX_ACTIONS_PER_CYCLE: null,
  MAX_ACTIONS_TOTAL: null,
  SKIP_USERS: new Set([
    'user_name_to_skip_example_1',
    'user_name_to_skip_example_2',
    'user_name_to_skip_example_3'
  ].map(user => user.toLowerCase()))
};

// Language definitions
const LOCALIZATION = {
  EN: {
    followsYou: 'Follows you',
    following: 'Following', 
    unfollow: 'Unfollow'
  },
  ES: {
    followsYou: 'Te sigue',
    following: 'Siguiendo',
    unfollow: 'Dejar de seguir'
  },
  PT: {
    followsYou: 'Segue você',
    following: 'Seguindo',
    unfollow: 'Deixar de Seguir'
  },
  ID: {
    followsYou: 'Mengikuti Kamu',
    following: 'Mengikuti',
    unfollow: 'Tidak Mengikuti'
  },
  TR: {
    followsYou: 'Seni takip ediyor',
    following: 'Takip ediliyor',
    unfollow: 'Takibi bırak'
  }
};

class TwitterUnfollower {
  constructor() {
    this.unfollowedTotal = 0;
    this.texts = LOCALIZATION[CONFIG.LANGUAGE];
  }

  async start() {
    try {
      await this.scrollAndUnfollow();
    } catch (error) {
      console.error('Error during unfollow process:', error);
    }
  }

  async scrollAndUnfollow() {
    window.scrollTo(0, document.body.scrollHeight);
    const unfollowed = await this.performUnfollow();
    
    if (unfollowed !== null) {
      setTimeout(() => this.scrollAndUnfollow(), CONFIG.MS_PER_CYCLE);
    } else {
      console.log('✅ Unfollow process completed!');
    }
  }

  async performUnfollow() {
    let unfollowed = 0;
    const userCells = document.querySelectorAll('[data-testid=UserCell]');

    for (const userCell of userCells) {
      if (this.shouldStopUnfollowing(unfollowed)) {
        return null;
      }

      const userName = this.extractUserName(userCell);
      if (!userName || CONFIG.SKIP_USERS.has(userName.toLowerCase())) {
        continue;
      }

      if (await this.shouldUnfollowUser(userCell)) {
        await this.unfollowUser(userCell, userName);
        unfollowed++;
        this.unfollowedTotal++;
      }
    }

    await this.handleConfirmationDialog();
    return unfollowed;
  }

  shouldStopUnfollowing(currentUnfollowed) {
    if (CONFIG.MAX_ACTIONS_TOTAL && this.unfollowedTotal >= CONFIG.MAX_ACTIONS_TOTAL) {
      console.log(`Reached total limit: ${CONFIG.MAX_ACTIONS_TOTAL}`);
      return true;
    }
    
    if (CONFIG.MAX_ACTIONS_PER_CYCLE && currentUnfollowed >= CONFIG.MAX_ACTIONS_PER_CYCLE) {
      console.log(`Reached cycle limit: ${CONFIG.MAX_ACTIONS_PER_CYCLE}`);
      return true;
    }
    
    return false;
  }

  extractUserName(userCell) {
    const userLink = userCell.querySelector('a[href^="/"][href*="/"]:not([href*="search?q="])');
    return userLink?.href.split('/').pop();
  }

  async shouldUnfollowUser(userCell) {
    if (CONFIG.UNFOLLOW_FOLLOWERS) {
      return true;
    }
    
    return !Array.from(userCell.querySelectorAll('*'))
      .some(element => element.textContent === this.texts.followsYou);
  }

  async unfollowUser(userCell, userName) {
    const followingButton = Array.from(userCell.querySelectorAll('[role=button]'))
      .find(button => button.textContent === this.texts.following);
      
    if (followingButton) {
      console.log(`🔄 Unfollowing: ${userName}`);
      followingButton.click();
    }
  }

  async handleConfirmationDialog() {
    const confirmButton = Array.from(document.querySelectorAll('[role=button]'))
      .find(button => button.textContent === this.texts.unfollow);
      
    if (confirmButton) {
      confirmButton.click();
    }
  }
}

// Initialize and start the unfollower
const unfollower = new TwitterUnfollower();
unfollower.start();
