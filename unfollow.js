(() => {
    const LANGUAGE = "EN";
    const WORDS = {
      EN: {
        followsYouText: "Follows you",
        followingButtonText: "Following",
        confirmationButtonText: "Unfollow"
      },
      ES: {
        followsYouText: "Te sigue",
        followingButtonText: "Siguiendo",
        confirmationButtonText: "Dejar de seguir"
      },
      PT: {
        followsYouText: "Segue você",
        followingButtonText: "Seguindo",
        confirmationButtonText: "Deixar de Seguir"
      },
      ID: {
        followsYouText: "Mengikuti Kamu",
        followingButtonText: "Mengikuti",
        confirmationButtonText: "Tidak Mengikuti"
      },
      TR: {
        followsYouText: "Seni takip ediyor",
        followingButtonText: "Takip ediliyor",
        confirmationButtonText: "Takibi bırak"
      }
    };
  
    const UNFOLLOW_FOLLOWERS = false;
    const MS_PER_CYCLE = 10;
    const MAXIMUM_UNFOLLOW_ACTIONS_PER_CYCLE = null;
    const MAXIMUM_UNFOLLOW_ACTIONS_TOTAL = null;
    const SKIP_USERS = [
      "user_name_to_skip_example_1",
      "user_name_to_skip_example_2",
      "user_name_to_skip_example_3"
    ].map(user => user.toLowerCase());
  
    let _UNFOLLOWED_TOTAL = 0;
  
    function performUnfollow(
      followsYouText = WORDS[LANGUAGE].followsYouText,
      followingButtonText = WORDS[LANGUAGE].followingButtonText,
      confirmationButtonText = WORDS[LANGUAGE].confirmationButtonText,
      unfollowFollowers = UNFOLLOW_FOLLOWERS,
      maximumUnfollowActionsPerCycle = MAXIMUM_UNFOLLOW_ACTIONS_PER_CYCLE,
      maximumUnfollowActionsTotal = MAXIMUM_UNFOLLOW_ACTIONS_TOTAL
    ) {
      let unfollowed = 0;
  
      maximumUnfollowActionsTotal = parseInt(maximumUnfollowActionsTotal);
      if (isNaN(maximumUnfollowActionsTotal)) maximumUnfollowActionsTotal = null;
  
      maximumUnfollowActionsPerCycle = parseInt(maximumUnfollowActionsPerCycle);
      if (isNaN(maximumUnfollowActionsPerCycle)) maximumUnfollowActionsPerCycle = null;
  
      let totalLimitReached = false;
      let localLimitReached = false;
  
      const userContainers = document.querySelectorAll('[data-testid=UserCell]');
      Array.from(userContainers).forEach(userContainer => {
        if (totalLimitReached || localLimitReached) return;
  
        if (
          maximumUnfollowActionsTotal !== null &&
          _UNFOLLOWED_TOTAL >= maximumUnfollowActionsTotal
        ) {
          console.log(
            "Exiting! Limit of unfollow actions in total reached: " +
              maximumUnfollowActionsTotal
          );
          totalLimitReached = true;
          return;
        }
  
        if (
          maximumUnfollowActionsPerCycle !== null &&
          unfollowed >= maximumUnfollowActionsPerCycle
        ) {
          console.log(
            "Exiting! Limit of unfollow actions per cycle reached: " +
              maximumUnfollowActionsPerCycle
          );
          localLimitReached = true;
          return;
        }
  
        let followsYou = false;
        if (!unfollowFollowers) {
          followsYou = Array.from(userContainer.querySelectorAll("*")).some(
            element => element.textContent === followsYouText
          );
        }
  
        if (!followsYou) {
          let skipUser = false;
          let userName = "";
  
          Array.from(userContainer.querySelectorAll("[href^='/']")).forEach(
            element => {
              if (skipUser) return;
              if (
                element.href.includes("search?q=") ||
                !element.href.includes("/")
              )
                return;
              userName = element.href
                .substring(element.href.lastIndexOf("/") + 1)
                .toLowerCase();
              Array.from(element.querySelectorAll("*")).some(subElement => {
                if (subElement.textContent.toLowerCase() === "@" + userName) {
                  if (SKIP_USERS.includes(userName)) {
                    console.log("We want to skip: " + userName);
                    skipUser = true;
                    return true;
                  }
                }
                return false;
              });
            }
          );
  
          if (!skipUser) {
            Array.from(
              userContainer.querySelectorAll('[role=button]')
            ).some(element => {
              if (element.textContent === followingButtonText) {
                console.log("* Unfollowing: " + userName);
                element.click();
                unfollowed++;
                _UNFOLLOWED_TOTAL++;
                return true;
              }
              return false;
            });
          }
        }
      });
  
      Array.from(document.querySelectorAll('[role=button]')).some(element => {
        if (element.textContent === confirmationButtonText) {
          element.click();
          return true;
        }
        return false;
      });
  
      return totalLimitReached ? null : unfollowed;
    }
  
    function scrollAndUnfollow() {
      window.scrollTo(0, document.body.scrollHeight);
      const unfollowed = performUnfollow();
      if (unfollowed !== null) {
        setTimeout(scrollAndUnfollow, MS_PER_CYCLE);
      } else {
        console.log("Total desired unfollow actions performed!");
      }
    }
  
    scrollAndUnfollow();
  })();
  