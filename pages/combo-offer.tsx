const ComboOffer = () => <>Redirecting...</>;

export async function getServerSideProps({ query }) {
  return {
    redirect: {
      destination: "/pricing/" + query.id,
      permanent: false,
    },
  };
}

export default ComboOffer;
