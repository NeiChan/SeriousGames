abstract class GameObject {
	private div			: any;
	
	private position_x 	: number;
	private position_y	: number;
	
	private speed_x		: number;
	private speed_y		: number;
	
	constructor(pos_x: number, pos_y: number, speed_x: number, speed_y: number, objectName: string)
	{
		this.div = createDiv(objectName);
		
		this.position_x = pos_x;
		this.position_y = pos_y;
		
		this.speed_x	= speed_x;
		this.speed_y	= speed_y;
		
		this.div.style.transform = "translate("+this.position_x+","+this.position_y+")"
	}
	
	public Draw() : void
	{
		
	}
	
	public Update() : void
	{

	}
}