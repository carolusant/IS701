import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";
/* eslint-disable */
export const thumbs_down = new GestureDescription("Borrar");
// [
//     [
//       "Thumb",
//       "No Curl",
//       "Diagonal Up Right"
//     ],
//     [
//       "Index",
//       "Full Curl",
//       "Vertical Up"
//     ],
//     [
//       "Middle",
//       "Full Curl",
//       "Vertical Up"
//     ],
//     [
//       "Ring",
//       "Full Curl",
//       "Vertical Up"
//     ],
//     [
//       "Pinky",
//       "Full Curl",
//       "Diagonal Up Left"
//     ]
//   ]

//Thumb
thumbs_down.addCurl(Finger.Thumb, FingerCurl.NoCurl);
thumbs_down.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1);
thumbs_down.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);
thumbs_down.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);
// thumbs_down.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 0.70);

//Index
thumbs_down.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
// thumbs_down.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7);
// thumbs_down.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70);

//Middle
thumbs_down.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
// thumbs_down.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7);
// thumbs_down.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.70);

//Ring
thumbs_down.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
// thumbs_down.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.7);

//Pinky
thumbs_down.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
// thumbs_down.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.7);
