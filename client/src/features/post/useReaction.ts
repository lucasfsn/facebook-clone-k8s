import { useReducer } from "react";
import {
  addReaction as addReactionApi,
  getReactions as getReactionsApi,
} from "../../services/apiPosts";
import { ReactionType, SingleReaction } from "../../types/posts";
import { SingleUser } from "../../types/user";
import { ResponseError, handleError } from "../../utils/helpers";

interface ReactionState {
  reactions: SingleReaction[] | null;
  reaction: ReactionType | undefined;
  reactionsCount: number;
}

const initialState: ReactionState = {
  reactions: null,
  reaction: undefined,
  reactionsCount: 0,
};

type Action = {
  type: "SET_REACTIONS";
  payload: {
    reactions: SingleReaction[];
    reactionsCount: number;
    reaction: ReactionType | undefined;
  };
};

function reducer(state: ReactionState, action: Action): ReactionState {
  switch (action.type) {
    case "SET_REACTIONS":
      return action.payload;
    default:
      return state;
  }
}
export function useReaction() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function addReaction(
    reaction: ReactionType,
    postId: string,
    user: SingleUser,
  ) {
    try {
      await addReactionApi(reaction, postId, user.id);
    } catch (err) {
      handleError(err as ResponseError);
    }
  }

  async function getReactions(postId: string, userId: string) {
    try {
      const { reactions, userReaction, reactionsCount } = await getReactionsApi(
        postId,
        userId,
      );

      dispatch({
        type: "SET_REACTIONS",
        payload: {
          reactions,
          reactionsCount,
          reaction: userReaction,
        },
      });
    } catch (err) {
      handleError(err as ResponseError);
    }
  }

  return {
    reactions: state.reactions,
    reaction: state.reaction,
    reactionsCount: state.reactionsCount,
    addReaction,
    getReactions,
  };
}
