
import { RouteComponentProps } from '@MyTypes/interface/route.ts';


const ExampleModulePage: React.FC<RouteComponentProps> = () => {


	return (
		<div className='h-full w-full py-8'>
			<div className={'bg-muted h-full w-full rounded-md'}>
				<div className='flex w-full flex-col'>
					<h1>Hello from ExampleModulePage.</h1>
				</div>
			</div>
		</div>
	);
};

export default ExampleModulePage;
