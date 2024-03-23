import Avatar from './Avatar';
import { BACKGROUND_COLORS } from '@/constants/colors';

// Todo(조예진) : 완성
export default function AvatarGroup({ isMobile, participants }) {
  const number = isMobile ? 2 : 4;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {participants && (
        <>
          {participants.slice(0, number).map((p, index) => (
            <span
              key={p.id}
              style={{
                marginLeft: `-${index > 0 ? 10 : 0}px`,
              }}
            >
              <Avatar
                size="large"
                image={p.profileImageUrl || null}
                text={p.email.charAt(0).toUpperCase()}
                backgroundColor={BACKGROUND_COLORS[index]}
              />
            </span>
          ))}
          {participants.length > number && (
            <span
              style={{
                marginLeft: '-10px',
              }}
            >
              <Avatar
                size="large"
                text={`+${participants.length - number}`}
                backgroundColor="#F4D7DA"
                textColorRed
              />
            </span>
          )}
        </>
      )}
    </>
  );
}
