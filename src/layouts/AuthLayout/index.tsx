import Left from "./Left";
import Right from "./Right";
type AuthProps = {
  onSubmit: (data: FormData) => void;
  leftLabel: string;
  rightTopHeading: string;
  rightTopParagraph: string;
  rightMiddleLink: string | boolean;
  rightBottomLabelLeft: string;
  rightBottomLabelRight: string;
  buttonLabel: string;
  rightBottomLink: string;
};
const AuthLayout = ({
  leftLabel,
  rightTopHeading,
  rightTopParagraph,
  rightMiddleLink,
  rightBottomLabelLeft,
  rightBottomLabelRight,
  buttonLabel,
  rightBottomLink,
  onSubmit,
}: AuthProps) => {
  return (
    <>
      <Left label={leftLabel} />
      <Right
        heading={rightTopHeading}
        paragraph={rightTopParagraph}
        buttonLabel={buttonLabel}
        rightMiddleLink={rightMiddleLink}
        rightBottomLabelLeft={rightBottomLabelLeft}
        rightBottomLabelRight={rightBottomLabelRight}
        rightBottomLink={rightBottomLink}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default AuthLayout;
