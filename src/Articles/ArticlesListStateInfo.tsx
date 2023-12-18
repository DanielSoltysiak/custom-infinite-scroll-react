interface Props {
  info: string;
}
const ArticlesListStateInfo = ({ info }: Props) => {
  return <p className="text-xl font-bold sm:text-3xl">{info}</p>;
};

export default ArticlesListStateInfo;
