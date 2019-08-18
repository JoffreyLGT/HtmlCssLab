namespace api.Models
{
    public class Attendee
    {
        public int Id { get; private set; }
        public string Name { get; set; }
        public bool IsComing { get; set; }
        public string Information { get; set; }
    }
}