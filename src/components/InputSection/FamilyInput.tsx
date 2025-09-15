import React from "react";
import { NumberInput } from "../NumberInput";
import { FamilyIcon, ClayRoomIcon, StoneRoomIcon } from "../Icons";
import { useGame } from "../../hooks/useGame";

export const FamilyInput: React.FC = () => {
  const { state, dispatch } = useGame();

  return (
    <div className="card">
      <h2 className="section-title">Family & Home</h2>
      <NumberInput
        value={state.family.familyMembers}
        onChange={(value) =>
          dispatch({ type: "UPDATE_FAMILY", field: "familyMembers", value })
        }
        min={2}
        max={5}
        label="Family"
        icon={<FamilyIcon size={20} />}
      />
      <NumberInput
        value={state.family.clayRooms}
        onChange={(value) =>
          dispatch({ type: "UPDATE_FAMILY", field: "clayRooms", value })
        }
        min={0}
        max={15}
        label="Clay Rooms"
        icon={<ClayRoomIcon size={20} />}
      />
      <NumberInput
        value={state.family.stoneRooms}
        onChange={(value) =>
          dispatch({ type: "UPDATE_FAMILY", field: "stoneRooms", value })
        }
        min={0}
        max={15}
        label="Stone Rooms"
        icon={<StoneRoomIcon size={20} />}
      />
    </div>
  );
};
